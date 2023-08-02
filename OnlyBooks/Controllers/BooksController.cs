using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlyBooks.Models;

namespace OnlyBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private OnlyBooksContext _dbContext;

        public BooksController(OnlyBooksContext dbContext)
        {
            _dbContext = dbContext; 
        }

        [HttpGet]
        [Route("GetBooks")]
        public IActionResult GetBooks()
        {
            List<Book> books = _dbContext.Books.ToList();
            return StatusCode(StatusCodes.Status200OK, books);  
        }

        [HttpGet]
        [Route("GetDiscounts")]
        public IActionResult GetDiscounts()
        {
            List<Discount> discounts = _dbContext.Discounts.ToList();
            return StatusCode(StatusCodes.Status200OK, discounts);
        }
    }
}
