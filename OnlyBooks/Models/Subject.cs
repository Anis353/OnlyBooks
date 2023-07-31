using System;
using System.Collections.Generic;

namespace OnlyBooks.Models;

public partial class Subject
{
    public int SubjectId { get; set; }

    public string Name { get; set; } = null!;

    public int CategoryId { get; set; }

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();

    public virtual Category Category { get; set; } = null!;
}
