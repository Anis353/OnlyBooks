using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlyBooks.Models;
using OnlyBooks.ViewModel;
using Microsoft.AspNetCore.Identity;

namespace OnlyBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private OnlyBooksContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger<UserController> _logger;

        public UserController(OnlyBooksContext context,
            UserManager<User> userManager, SignInManager<User> signInManager, ILogger<UserController> logger)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Users.Any(u => u.Email == model.Email))
            {
                ModelState.AddModelError("Email", "Пользователь с таким email уже существует.");
                return BadRequest(ModelState);
            }

            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Phone = model.Phone,
                Address = model.Address,
                UserName = model.LastName,
                Password = model.Password,
                Role = "Client" 
            };
            var result = await _userManager.CreateAsync(user, model.Password);  // Добавляет пользователя в базу

            if (result.Succeeded)
            {
                // Пользователь успешно зарегистрирован
                return Ok(new { Message = "Пользователь успешно зарегистрирован." });
            }
            else
            {
                // Обработка ошибок регистрации
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Найдите пользователя по email
            var user = await _userManager.FindByEmailAsync(model.Email);
            _logger.LogInformation("Почта пользователя: " + model.Email);

            if (user == null)
            {
                ModelState.AddModelError("Email", "Пользователь с таким email не найден.");
                return new JsonResult(new { error = "Пользователь с таким email не найден." }) { StatusCode = 400 };
            }

            // Попытка входа пользователя
            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                // Успешный вход
                return Ok(new
                {
                    user.Email,
                    user.FirstName,
                    user.LastName,
                    user.Address,
                    user.Phone
                });
            }
            else
            {
                ModelState.AddModelError("Password", "Неверный пароль.");
                return new JsonResult(new { error = "Неверный пароль." }) { StatusCode = 400 };
            }
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return NotFound(); // Пользователь не найден
            }

            // Обновите данные пользователя на основе модели UpdateUserViewModel
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Phone = model.Phone;
            user.Address = model.Address;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok(); // Успешное обновление
            }
            else
            {
                return BadRequest(result.Errors); // Ошибка обновления
            }
        }

    }
}
