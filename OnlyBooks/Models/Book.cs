using System;
using System.Collections.Generic;

namespace OnlyBooks.Models;

public partial class Book
{
    public int BookId { get; set; }

    public string Title { get; set; } = null!;

    public int AuthorId { get; set; }

    public decimal Price { get; set; }

    public string Description { get; set; } = null!;

    public string Publisher { get; set; } = null!;

    public int PublicationYear { get; set; }

    public string Isbn { get; set; } = null!;

    public string CoverImage { get; set; } = null!;

    public int PageCount { get; set; }

    public int? SubjectId { get; set; }

    public int QuantityInStock { get; set; }

    public double? Rate { get; set; }

    public virtual Author Author { get; set; } = null!;

    public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();

    public virtual Subject? Subject { get; set; }

    public virtual ICollection<Genre> Genres { get; set; } = new List<Genre>();
}
