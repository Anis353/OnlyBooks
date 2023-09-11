using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OnlyBooks.Models;
using System.Linq;

namespace OnlyBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : Controller
    {
        private OnlyBooksContext _dbContext;
        private readonly ILogger<SearchController> _logger;

        public SearchController(OnlyBooksContext dbContext, ILogger<SearchController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpGet]
        [Route("SearchBooks")]
        public IActionResult SearchBooks(string searchTerm)
        {
            _logger.LogInformation($"SearchBooks called with searchTerm: {searchTerm}");

            var searchResults = _dbContext.Books
                .Include(b => b.Authors)
                .Where(book => book.Title.Contains(searchTerm))
                .ToList();

            return Ok(searchResults);
        }
    }
}
