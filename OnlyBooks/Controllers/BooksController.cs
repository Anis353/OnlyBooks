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
        [Route("GetBookById")]
        public IActionResult GetBookById(int? bookId)
        {
            var book = _dbContext.Books.FirstOrDefault(b => b.BookId == bookId);
            return StatusCode(StatusCodes.Status200OK, book);
        }

        [HttpGet]
        [Route("GetBooksPagination")]
        public IActionResult GetBooksPagination(int? subjectId, int? subjectMin, int? categoryId, int? minRate, int? year, int? _page, int? _limit)
        {
            int pageNumber = _page ?? 1;
            int pageSize = _limit ?? 10;

            IQueryable<Book> booksQuery = _dbContext.Books;

            // Применяем фильтр по предмету (subjectId)
            if (subjectId.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.SubjectId == subjectId);
            }

            if (subjectMin.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.SubjectId >= subjectMin);
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

            if (year.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.PublicationYear == year);
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

        [HttpGet]
        [Route("GetDiscountById")]
        public IActionResult GetDiscountById(int? bookId)
        {
            var discount = _dbContext.Discounts.FirstOrDefault(d => d.BookId == bookId);
            return StatusCode(StatusCodes.Status200OK, discount);
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

        [HttpGet]
        [Route("GetCategoryById")]
        public IActionResult GetCategoryById(int? bookId)
        {
            if (bookId == null)
            {
                return BadRequest("Книга не найдена");
            }

            var bookCategories = _dbContext.BookCategories
                .Where(bc => bc.BookId == bookId)
                .Select(bc => bc.CategoryId)
                .ToList();

            if (bookCategories.Count == 0)
            {
                return NotFound("Категорий не найдено");
            }

            var categories = _dbContext.Categories
            .Where(c => bookCategories.Contains(c.CategoryId))
            .ToList();

            return StatusCode(StatusCodes.Status200OK, categories);
        }

        [HttpGet]
        [Route("GetGenreById")]
        public IActionResult GetGenreById(int? bookId)
        {
            var book = _dbContext.Books
                 .Include(b => b.Genres)
                 .FirstOrDefault(b => b.BookId == bookId);

            if (book == null)
            {
                return NotFound();
            }

            var genres = book.Genres.Select(a => new
            {
                a.GenreId,
                a.Name,
            });

            return StatusCode(StatusCodes.Status200OK, genres);
        }

    }
}
