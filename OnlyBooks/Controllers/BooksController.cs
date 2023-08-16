using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlyBooks.Models;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Collections.Generic;

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
        public IActionResult GetBooksPagination(int? subjectId, int? categoryId, int? minRate, int? _page, int? _limit)
        {
            int pageNumber = _page ?? 1;
            int pageSize = _limit ?? 10;

            IQueryable<Book> booksQuery = _dbContext.Books;

            // Применяем фильтр по предмету (subjectId)
            if (subjectId.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.SubjectId == subjectId);
            }

            // Применяем фильтр по категории (categoryId)
            if (categoryId.HasValue)
            {
                List<int> bookIdsInCategory = _dbContext.BookCategories
                    .Where(bc => bc.CategoryId == categoryId)
                    .Select(bc => bc.BookId.Value)
                    .ToList();

                booksQuery = booksQuery.Where(b => bookIdsInCategory.Contains(b.BookId));
            }

            // Применяем фильтр по минимальному рейтингу (minRate)
            if (minRate.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.Rate >= minRate);
            }

            List<Book> books = booksQuery
                .Skip((pageNumber - 1) * pageSize)
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


        // Получить автора по bookId
        [HttpGet]
        [Route("GetAuthors")]
        public IActionResult GetAuthorsById(int? bookId)
        {
            var book = _dbContext.Books
               .Include(b => b.Authors)
               .FirstOrDefault(b => b.BookId == bookId);

            if (book == null)
            {
                return NotFound();
            }

            var authors = book.Authors.Select(a => new
            {
                a.AuthorId,
                a.FirstName,
                a.LastName,
                
            });

            return StatusCode(StatusCodes.Status200OK, authors);
        }

    }
}
