﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlyBooks.Models;
using OnlyBooks.ViewModel;

namespace OnlyBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private OnlyBooksContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger<AdminController> _logger;

        public AdminController(OnlyBooksContext context,
            UserManager<User> userManager, SignInManager<User> signInManager, ILogger<AdminController> logger)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpGet("orders")]
        public async Task<IActionResult> GetOrders()
        {
            var ordersWithUserEmail = await _context.Orders
                .Include(o => o.User)
                .Select(o => new
                {
                    OrderId = o.OrderId,
                    OrderDate = o.OrderDate,
                    TotalAmount = o.TotalAmount,
                    PaymentStatus = o.PaymentStatus,
                    ShippingAddress = o.ShippingAddress,
                    Email = o.User.Email
                })
                .ToListAsync();

            return Ok(ordersWithUserEmail);
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users
                .Select(u => new
                {
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Phone = u.Phone,
                    Address = u.Address
                })
                .ToListAsync();
            _logger.LogInformation("Получены пользователи: {@Users}", users);

            return Ok(users);

        }

        [HttpPut("update-payment-status/{orderId}")]
        public IActionResult UpdatePaymentStatus(int orderId, [FromBody] OrderUpdateViewModel model)
        {
            var order = _context.Orders.FirstOrDefault(o => o.OrderId == orderId);

            if (order == null)
            {
                return NotFound();
            }

            order.PaymentStatus = model.PaymentStatus;
            _context.SaveChanges();

            return Ok(order);
        }

        [HttpDelete("delete-order/{orderId}")]
        public IActionResult DeleteOrder(int orderId)
        {
            var order = _context.Orders.FirstOrDefault(o => o.OrderId == orderId);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            _context.SaveChanges();

            return NoContent();
        }


        //[HttpGet("books")]
        //public IActionResult GetBooks()
        //{
        //    var books = _context.Books.Sum(book => book.QuantityInStock);
        //    return Ok(books);
        //}

    }
}