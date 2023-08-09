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
        [Route("GetBooksPagination")]
        public IActionResult GetBooksPagination(int? _page, int? _limit)
        {
            int pageNumber = _page ?? 1; 
            int pageSize = _limit ?? 10;

            List<Book> booksCount = _dbContext.Books.ToList();
            Response.Headers.Add("X-Total-Count", booksCount.Count.ToString());

            // Вычисляем количество элементов, которое нужно пропустить
            int skipAmount = (pageNumber - 1) * pageSize;

            List<Book> books = _dbContext.Books
                .Skip(skipAmount)
                .Take(pageSize)
                .ToList();

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
