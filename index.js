

console.log("hello")
const userName = document.getElementById("nameInput");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;


submitBtn.addEventListener("click", () => {
    const val =userName.value;
    if (val.trim() !== "" && userName.checkValidity()) {
        // console.log(val);
        generatePDF(val);
      } else {
        userName.reportValidity();
      }
});
const generatePDF = async (name) => {
    const existingPdfBytes = await fetch("Certificate.pdf").then((res) =>
      res.arrayBuffer()
    );

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    
  //get font
  const fontBytes = await fetch("Sanchez-Regular.ttf").then((res) =>
  res.arrayBuffer()
);
  // Embed our custom font in the document
  const SanChezFont  = await pdfDoc.embedFont(fontBytes);
   // Get the first page of the document
   const pages = pdfDoc.getPages();
   const firstPage = pages[0];
 
   // Draw a string of text diagonally across the first page
   firstPage.drawText(name, {
     x: 300,
     y: 270,
     size: 40,
     font: SanChezFont ,
     color: rgb(0.2, 0.84, 0.67),
   });
 
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  saveAs(pdfDataUri,"newcertificate.pdf")
};

        const dataForm = document.getElementById("dataForm");
        const nameInput = document.getElementById("nameInput");   
        const dataTable = document.getElementById("dataTable");
        let data = JSON.parse(localStorage.getItem("savedData")) || [];

        data.forEach(item => appendToTable(item.name));

        dataForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = nameInput.value.trim();

            if (name !== "") {
                data.push({ name });
                appendToTable(name);
                nameInput.value = "";
                saveDataToLocalStorage();
            }
        });

        function appendToTable(name) {
            const tableBody = dataTable.querySelector("tbody");
            const row = document.createElement("tr");
            row.innerHTML = `<td>${name}</td>`;
            tableBody.appendChild(row);
        }

        function saveDataToLocalStorage() {
            localStorage.setItem("savedData", JSON.stringify(data));
        }


