using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackAPI.Models
{
	public class Employee
	{
		[Key]
		public Guid Id { get; set; }
		public string Name { get; set; } = "";
		public string Email { get; set; } = "";
		public long Phone { get; set; }
		public long Salary { get; set; }
		public string Department { get; set; } = "";

	}
}
