using FullStackAPI.Data;
using FullStackAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;

namespace FullStackAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class EmployeesController : Controller
	{
		private readonly FullStackDbContext _context;

		public EmployeesController(FullStackDbContext context) {
			_context = context;
		}
		[HttpGet]
		public async Task<IActionResult> GetEmployeesList()
		{
			var employees = await _context.Employees.ToListAsync();
			return Ok(employees);
		}
		[HttpPost]
		public async Task<IActionResult> CreateEmployee([FromBody] Employee employee)
		{
			employee.Id = Guid.NewGuid();
			await _context.AddAsync<Employee>(employee);
			await _context.SaveChangesAsync();

			return Ok(employee);
		}
		[HttpGet]
		[Route("{id:Guid}")]
		public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
		{
			var employee = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);

			if(employee == null)
			{
				return NotFound();
			}

			return Ok(employee);
		}

		[HttpPut]
		[Route("{id:Guid}")]
		public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, [FromBody] Employee UpdateEmployee)
		{
			if(id != UpdateEmployee.Id)
			{
				return BadRequest();
			}

			var employee = await _context.Employees.FindAsync(id);

			if(employee == null) { return NotFound(); }

			employee.Name = UpdateEmployee.Name;
			employee.Email = UpdateEmployee.Email;
			employee.Salary = UpdateEmployee.Salary;
			employee.Department = UpdateEmployee.Department;
			employee.Phone = UpdateEmployee.Phone;

			await _context.SaveChangesAsync();
			return Ok(employee);
		}
		[HttpDelete]
		[Route("{id:Guid}")]
		public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
		{
			var employee = _context.Employees.FirstOrDefault(x => x.Id == id);

			if(employee == null) { return NotFound(); }

			_context.Employees.Remove(employee);
			await _context.SaveChangesAsync();

			return Ok(employee);
		}
	}
}
