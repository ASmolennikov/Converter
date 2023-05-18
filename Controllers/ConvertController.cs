using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

namespace Converter.Controllers;

[ApiController]
[Route("[controller]")]
public class ConvertController : ControllerBase
{
    [HttpPost]
    public IActionResult Convert(Request request)
    {
        var hex = request.Value[2..];
        var agreementPdfBytes = Enumerable.Range(0, hex.Length / 2)
            .Select(x => System.Convert.ToByte(hex.Substring(x * 2, 2), 16)).ToArray();

        var contentDisposition = new ContentDisposition
        {
            FileName = "my_pdf",
            Inline = true
        };

        Response.Headers.Add("Content-Disposition", contentDisposition.ToString());

        return File(agreementPdfBytes, "application/pdf");
    }
}