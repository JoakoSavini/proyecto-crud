import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPdf = (data, title, columns) => {
    const doc = new jsPDF();

    // 📌 Título grande y estilizado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(55, 55, 55);
    doc.text(`Listado de ${title}`, 105, 20, null, null, "center");

    // 📌 Subtítulo con fecha
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    const today = new Date();
    doc.text(`Generado el: ${today.toLocaleDateString()}`, 14, 30);

    // 📌 Prepara datos de tabla
    const tableColumn = columns;
    const tableRows = [];

    data?.forEach((item) => {
        const itemData = [
            item.name,
            item.age,
            item.color,
            item.power,
        ];
        tableRows.push(itemData);
    });

    // 📌 AutoTable con estilo moderno
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: {
            fontSize: 12,
            cellPadding: 4,
            textColor: [60, 60, 60],
            lineColor: [220, 220, 220],
            lineWidth: 0.2,
        },
        headStyles: {
            fillColor: [51, 153, 255],   // Color pastel tipo dashboard
            textColor: [255, 255, 255],
            fontSize: 13,
            halign: "center",
            valign: "middle",
        },
        alternateRowStyles: { fillColor: [245, 245, 245] }, // Gris clarito
        tableLineColor: [230, 230, 230],
        tableLineWidth: 0.1,
        margin: { top: 40 },
        didDrawPage: (data) => {
            // 📌 Footer en cada página
            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(10);
            doc.setTextColor(120, 120, 120);
            doc.text(
                `Página ${doc.internal.getCurrentPageInfo().pageNumber} de ${pageCount}`,
                doc.internal.pageSize.getWidth() - 20,
                doc.internal.pageSize.getHeight() - 10,
                null,
                null,
                "right"
            );
        },
    });

    // 📌 Guarda PDF
    doc.save(`${title}.pdf`);
};
