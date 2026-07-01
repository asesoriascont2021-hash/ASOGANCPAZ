import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const outputDir = path.join(process.cwd(), 'public', 'documentos');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, '2_estados_financieros_firmados_2025.pdf');
const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 60, bottom: 60, left: 60, right: 60 },
  bufferPages: true // allow us to add page numbers later
});

doc.pipe(fs.createWriteStream(outputPath));

// Helpers for design
const primaryColor = '#1e3a1e'; // Dark green (ASOGANCPAZ theme)
const accentColor = '#854d0e'; // Gold/Amber
const textColor = '#1c1917'; // Soft dark stone
const lightGray = '#f5f5f4'; // Warm stone background
const borderGray = '#e7e5e4';

// Function to draw page header
function drawHeader(doc, pageTitle) {
  doc.save();
  // Logo placeholder text
  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(14).text('ASOCIACIÓN GANADERA CAMPESINA POR LA PAZ', { align: 'center' });
  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(12).text('ASOGANCPAZ', { align: 'center' });
  doc.fillColor(textColor).font('Helvetica').fontSize(9).text('NIT: 901.660.410-6 | Municipio: Icononzo – Tolima', { align: 'center' });
  doc.moveDown(0.5);
  doc.strokeColor(primaryColor).lineWidth(1).moveTo(60, doc.y).lineTo(552, doc.y).stroke();
  doc.moveDown(1);
  doc.restore();
}

// Draw signature section
function drawSignatures(doc, yPos, showBenavides = false) {
  doc.save();
  
  // Left Signature
  doc.moveTo(100, yPos).lineTo(260, yPos).strokeColor('#78716c').lineWidth(1).stroke();
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(9)
     .text(showBenavides ? 'JOHAN DAVID MACHADO BENAVIDES' : 'JOHAN DAVID MACHADO B.', 80, yPos + 8, { width: 200, align: 'center' });
  doc.font('Helvetica').fontSize(8)
     .text('Representante Legal / Presidente', 80, yPos + 22, { width: 200, align: 'center' });

  // Right Signature
  doc.moveTo(350, yPos).lineTo(510, yPos).strokeColor('#78716c').lineWidth(1).stroke();
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(9)
     .text('YUDY ANGELICA VELASQUEZ R', 330, yPos + 8, { width: 200, align: 'center' });
  doc.font('Helvetica').fontSize(8)
     .text('CONTADORA PUBLICA\nTP.183655-T', 330, yPos + 22, { width: 200, align: 'center' });
     
  doc.restore();
}

// Function to draw simple grid row
function drawTableRow(doc, col1, col2, col3, isHeader = false) {
  const currentY = doc.y;
  const padding = 6;
  
  doc.save();
  
  if (isHeader) {
    doc.rect(60, currentY, 492, 20).fill(primaryColor);
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(9);
  } else {
    doc.rect(60, currentY, 492, 20).fill(lightGray);
    doc.fillColor(textColor).font('Helvetica').fontSize(8);
  }

  // Draw texts
  doc.text(col1, 70, currentY + padding, { width: 260 });
  if (col2 !== undefined) {
    doc.text(col2, 340, currentY + padding, { width: 60, align: 'center' });
  }
  if (col3 !== undefined) {
    if (isHeader) {
      doc.text(col3, 420, currentY + padding, { width: 120, align: 'right' });
    } else {
      doc.font('Helvetica-Bold').text(col3, 420, currentY + padding, { width: 120, align: 'right' });
    }
  }

  // Horizontal border line
  doc.strokeColor(borderGray).lineWidth(0.5).moveTo(60, currentY + 20).lineTo(552, currentY + 20).stroke();
  
  doc.restore();
  doc.y = currentY + 20;
}

// PAGE 1: BALANCE GENERAL
drawHeader(doc);
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(11).text('ESTADO DE SITUACIÓN FINANCIERA (BALANCE GENERAL)', { align: 'center' });
doc.fillColor(textColor).font('Helvetica-Oblique').fontSize(9).text('Al 31 de diciembre de 2025\n(Valores expresados en pesos colombianos)', { align: 'center' });
doc.moveDown(1.5);

drawTableRow(doc, 'A C T I V O S', 'NOTAS', '2025', true);
drawTableRow(doc, 'ACTIVO CORRIENTE', '', '');
drawTableRow(doc, '   Equivalentes Y Equivalente al Efectivo', '4', '$1.660.000');
drawTableRow(doc, 'TOTAL ACTIVO CORRIENTE', '', '$1.660.000');
drawTableRow(doc, 'ACTIVO NO CORRIENTE', '', '');
drawTableRow(doc, '   Terrenos', '5', '$400.000.000');
drawTableRow(doc, '   Activos biológicos', '6', '$42.000.000');
drawTableRow(doc, 'TOTAL ACTIVO NO CORRIENTE', '', '$442.000.000');
drawTableRow(doc, 'TOTAL ACTIVOS', '', '$443.660.000');

doc.moveDown(1);
drawTableRow(doc, 'PASIVO Y PATRIMONIO', '', '');
drawTableRow(doc, 'PASIVO CORRIENTE', '', '');
drawTableRow(doc, '   Cuentas por Pagar Proveedores', '', '-');
drawTableRow(doc, '   Obligaciones Financieras', '', '-');
drawTableRow(doc, '   Retención en la Fuente x Pagar', '', '-');
drawTableRow(doc, 'TOTAL PASIVO CORRIENTE', '', '-');

doc.moveDown(0.5);
drawTableRow(doc, 'PATRIMONIO', '', '');
drawTableRow(doc, '   Aportes Sociales (17 socios)', '7', '$2.489.000');
drawTableRow(doc, '   Aportaciones en Especie (Terrenos y Activos Biológicos)', '8', '$442.000.000');
drawTableRow(doc, '   Resultado del Ejercicio años anteriores 2022-2024', '9', '($169.000)');
drawTableRow(doc, '   Utilidad y/o Pérdida Ejercicios Anteriores', '9', '($660.000)');
drawTableRow(doc, 'TOTAL PATRIMONIO', '', '$443.660.000');
drawTableRow(doc, 'TOTAL PASIVOS + PATRIMONIO', '', '$443.660.000');

drawSignatures(doc, 650);

// PAGE 2: ESTADO DE RESULTADOS
doc.addPage();
drawHeader(doc);
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(11).text('ESTADO DE RESULTADOS', { align: 'center' });
doc.fillColor(textColor).font('Helvetica-Oblique').fontSize(9).text('Período: 1 de enero – 31 de diciembre de 2025\n(Valores expresados en pesos colombianos)', { align: 'center' });
doc.moveDown(1.5);

drawTableRow(doc, 'INGRESOS', 'NOTAS', '2025', true);
drawTableRow(doc, 'INGRESOS OPERACIONALES', '', '');
drawTableRow(doc, '   Ingresos Operacionales', '', '-');
drawTableRow(doc, 'TOTAL INGRESOS OPERACIONALES', '', '-');

doc.moveDown(1);
drawTableRow(doc, 'GASTOS OPERACIONALES', '', '');
drawTableRow(doc, '   Otros Generales', '10', '$660.000');
drawTableRow(doc, 'TOTAL GASTOS', '', '$660.000');

doc.moveDown(1);
drawTableRow(doc, 'EXCEDENTE O PÉRDIDA DEL EJERCICIO', '', '($660.000)');

drawSignatures(doc, 650);

// PAGE 3: POLÍTICAS CONTABLES (PARTE 1)
doc.addPage();
drawHeader(doc);
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(11).text('POLÍTICAS CONTABLES Y REVELACIONES A LOS ESTADOS FINANCIEROS', { align: 'center' });
doc.fillColor(textColor).font('Helvetica-Oblique').fontSize(9).text('A 31 DE DICIEMBRE DE 2025\n(Expresadas en pesos colombianos)', { align: 'center' });
doc.moveDown(1);

doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('NOTA 1. ENTIDAD QUE REPORTA');
doc.moveDown(0.3);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text(
  'La ASOCIACIÓN GANADERA CAMPESINA POR LA PAZ, con sigla ASOGANCPAZ, es una entidad sin ánimo de lucro de naturaleza asociativa, persona jurídica de derecho privado, perteneciente al régimen de las entidades sin ánimo de lucro y de la economía solidaria, regulada en lo pertinente por los artículos 633 a 652 del Código Civil Colombiano, el Decreto 2150 de 1995, el Decreto 427 de 1996 y demás normas concordantes.\n\n' +
  'La entidad fue constituida mediante Acta No. 01 del 21 de noviembre de 2022, e inscrita en la Cámara de Comercio del Sur y Oriente del Tolima el 02 de diciembre de 2022, bajo el No. 14713 del Libro I del Registro de Entidades sin Ánimo de Lucro. Su domicilio principal se encuentra en la Vereda La Fila, Finca El Pencil, municipio de Icononzo, departamento del Tolima, e identificada con el Número de Identificación Tributaria (NIT) 901.660.410-6. A la fecha de corte de los presentes estados financieros, la entidad no se encuentra disuelta y su término de duración estatutario se extiende hasta el 21 de noviembre de 2042, último año de renovación de su matrícula mercantil 2026.\n\n' +
  'El objeto social de la entidad es asociarse para producir y comercializar productos agropecuarios, agroindustriales y agroturísticos, con el fin de satisfacer la demanda de la seguridad alimentaria que requiere el país, cuidando el equilibrio ecológico y las buenas prácticas agropecuarias y de manufactura. En desarrollo de su objeto social, la entidad podrá desarrollar las siguientes actividades:\n' +
  '  - Producir ganado para la producción de lácteos y sus derivados.\n' +
  '  - Producir ganado para la producción de carnes y sus derivados.\n' +
  '  - Producción y comercialización de productos agropecuarios.\n' +
  '  - Prestación de servicios agroturísticos.',
  { align: 'justify', lineGap: 3 }
);

doc.moveDown(1);
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('NOTA 2. BASES DE PREPARACIÓN');
doc.moveDown(0.3);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text(
  'Declaración de cumplimiento. Los estados financieros individuales de la ASOCIACIÓN GANADERA CAMPESINA POR LA PAZ – ASOGANCPAZ, correspondientes al año terminado el 31 de diciembre de 2025, han sido preparados de conformidad con las normas de contabilidad y de información financiera aceptadas en Colombia, según lo establecido en la Ley 1314 de 2009, reglamentada por el Decreto Único Reservado 2420 de 2015 y sus modificatorios, tomando como referencia técnica el marco normativo dirigido a las microempresas (Grupo 3), contenido en el Anexo 3 de dicho decreto, compilado originalmente en el Decreto 2706 de 2012.\n\n' +
  'Moneda funcional. Las partidas incluidas en los estados financieros de la entidad se expresan en pesos colombianos ($COP), la cual es su moneda funcional y de presentación.',
  { align: 'justify', lineGap: 3 }
);

// PAGE 4: POLÍTICAS CONTABLES (PARTE 2)
doc.addPage();
drawHeader(doc);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text(
  'Base contable de acumulación o devengo. La entidad elabora sus estados financieros, excepto en lo relacionado con la información sobre flujos de efectivo, utilizando la base contable de acumulación o devengo, reconociendo las partidas como activos, pasivos, patrimonio, ingresos o gastos cuando satisfacen las definiciones y los criterios de reconocimiento para esas partidas.\n\n' +
  'Base de medición. Las bases de medición o determinación de los valores monetarios en los que se reconocen los elementos de los estados financieros son el costo histórico y el valor razonable.\n\n' +
  'Uso de estimaciones y juicios. La preparación de los estados financieros de acuerdo con el marco técnico normativo aplicable requiere que la administración realice juicios, estimaciones y supuestos que afectan la aplicación de las políticas contables y los montos de activos, pasivos, ingresos y gastos reconocidos en la fecha de corte.\n\n' +
  'Importancia relativa y materialidad. Los hechos económicos se presentan de acuerdo con su importancia relativa o materialidad. Para efectos de revelación, una transacción, hecho u operación es material cuando, debido a su cuantía o naturaleza, su conocimiento o desconocimiento incide en las decisiones que puedan tomar los usuarios de la información contable. En la preparación y presentación de los estados financieros, se determina como material una partida, transacción o ajuste que sea igual o superior al 1% del activo total.',
  { align: 'justify', lineGap: 3 }
);

doc.moveDown(1.5);
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('NOTA 3. PRINCIPALES POLÍTICAS CONTABLES');
doc.moveDown(0.3);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text(
  'Activos. Son los recursos controlados por la entidad como resultado de sucesos pasados, de los cuales la entidad espera obtener, en el futuro, beneficios económicos o un potencial de servicio relacionado con el cumplimiento de su objeto social.\n\n' +
  'Pasivos. Son las obligaciones presentes de la entidad con terceros, surgidas de transacciones o sucesos pasados, cuyo pago se espera que genere una salida de recursos económicos. A 31 de diciembre de 2025 la entidad no registra pasivos.\n\n' +
  'Patrimonio. Es el valor residual de los activos de la entidad, una vez deducidos todos sus pasivos. De conformidad con el artículo 6 de los estatutos, el patrimonio de ASOGANCPAZ está constituido por las cuotas pagadas por los asociados, los auxilios donados por personas naturales o jurídicas, los bienes que a cualquier título adquiera (incluyendo donaciones de empresas nacionales o extranjeras) y los bienes que por cualquier concepto ingresen a la entidad. Conforme al artículo 9 de los estatutos, los bienes y fondos de la entidad son indivisibles; ni los fundadores ni persona alguna derivan de ella ventajas especiales, ni reciben suma alguna por concepto de utilidades o reparto de excedentes.',
  { align: 'justify', lineGap: 3 }
);

// PAGE 5: POLÍTICAS CONTABLES (PARTE 3) & NOTA 4
doc.addPage();
drawHeader(doc);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text(
  'Ingresos. Se definen como los incrementos en los beneficios económicos producidos a lo largo del periodo contable, en forma de entradas o incrementos de valor de los activos, o bien como disminuciones de los pasivos, que dan como resultado aumentos del patrimonio neto y que no provienen de los aportes de los asociados. Conforme al artículo 8 de los estatutos, los fondos de la entidad provienen de los aportes ordinarios y extraordinarios de los asociados, del producto de contratos o convenios para la prestación de servicios, del valor de las donaciones, subsidios y contribuciones recibidas, y de las utilidades y rentas obtenidas de sus propios bienes.\n\n' +
  'Gastos y costos. Se definen como decrementos en los beneficios económicos producidos a lo largo del periodo, en forma de salidas o disminuciones del valor de los activos, o por la generación o aumento de los pasivos, que dan como resultado decrementos en el patrimonio. La entidad reconoce un gasto cuando éste produce una disminución de los activos o un incremento en los pasivos, siempre que se pueda valorar con fiabilidad y exista el principio de prudencia.\n\n' +
  'Activos biológicos. Corresponden a los animales vivos (ganado bovino) que la entidad mantiene para la producción de carne y leche, en el desarrollo de su objeto social, y se reconocen al costo o, cuando se dispone de él de manera fiable, al valor razonable.\n\n' +
  'Terrenos. Se reconocen al costo de adquisición o al valor de la aportación recibida, y no son objeto de depreciación.',
  { align: 'justify', lineGap: 3 }
);

doc.moveDown(1.5);
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('REVELACIONES AL ESTADO DE SITUACIÓN FINANCIERA');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(9.5).text('NOTA 4. EFECTIVO Y EQUIVALENTES AL EFECTIVO');
doc.moveDown(0.3);
doc.font('Helvetica').text('Este rubro corresponde a los recursos de disponibilidad inmediata de la entidad, representados en caja y/o cuentas de ahorro, destinados al cumplimiento de su objeto social, de conformidad con lo previsto en el artículo 7 de los estatutos.\n\nAl final del periodo gravable 2025, el saldo es el siguiente:');
doc.moveDown(0.5);

drawTableRow(doc, 'EFECTIVO Y EQUIVALENTE AL EFECTIVO', '', '2025', true);
drawTableRow(doc, 'Efectivo y equivalentes al efectivo', '', '1.660.000');
drawTableRow(doc, 'TOTAL EFECTIVO Y EQUIVALENTE AL EFECTIVO', '', '1.660.000');

// PAGE 6: NOTAS 5, 6, 7
doc.addPage();
drawHeader(doc);

doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('NOTA 5. TERRENOS');
doc.moveDown(0.3);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text('Corresponde al valor de los bienes inmuebles (terrenos) que hacen parte del activo no corriente de la entidad, recibidos como aportación en especie por parte de los asociados constituyentes, de conformidad con el artículo 6 de los estatutos.\n\nAl final del periodo gravable 2025, el saldo es el siguiente:');
doc.moveDown(0.5);
drawTableRow(doc, 'TERRENOS', '', '2025', true);
drawTableRow(doc, 'Terrenos', '', '400.000.000');
drawTableRow(doc, 'TOTAL TERRENOS', '', '400.000.000');

doc.moveDown(1.5);
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('NOTA 6. ACTIVOS BIOLÓGICOS');
doc.moveDown(0.3);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text('Corresponde al ganado destinado a la producción de leche y carne, en desarrollo del objeto social de la entidad, recibido como aportación en especie y/o adquirido para el cumplimiento de sus fines.\n\nAl final del periodo gravable 2025, el saldo es el siguiente:');
doc.moveDown(0.5);
drawTableRow(doc, 'ACTIVOS BIOLÓGICOS', '', '2025', true);
drawTableRow(doc, 'Activos biológicos (semovientes)', '', '42.000.000');
drawTableRow(doc, 'TOTAL ACTIVOS BIOLÓGICOS', '', '42.000.000');

doc.moveDown(1.5);
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('NOTA 7. APORTES SOCIALES');
doc.moveDown(0.3);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text('Representan el valor de las cuotas y aportes realizados en efectivo por los diecisiete (17) asociados de la entidad, de conformidad con lo establecido en el artículo 6 de los estatutos y la normatividad vigente para las entidades sin ánimo de lucro.\n\nAl final del periodo gravable 2025, el saldo es el siguiente:');
doc.moveDown(0.5);
drawTableRow(doc, 'APORTES SOCIALES', '', '2025', true);
drawTableRow(doc, 'Aportes sociales (17 socios)', '', '3.031.000');
drawTableRow(doc, 'TOTAL APORTES SOCIALES', '', '3.031.000');

// PAGE 7: NOTAS 8, 9
doc.addPage();
drawHeader(doc);

doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('NOTA 8. APORTACIONES EN ESPECIE');
doc.moveDown(0.3);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text('Corresponde al valor de los bienes (terrenos y activos biológicos) aportados en especie por los asociados al patrimonio de la entidad, de conformidad con el artículo 6 de los estatutos, los cuales hacen parte del patrimonio institucional y son indivisibles conforme al artículo 9 de los mismos.\n\nAl final del periodo gravable 2025, el saldo es el siguiente:');
doc.moveDown(0.5);
drawTableRow(doc, 'APORTACIONES EN ESPECIE', '', '2025', true);
drawTableRow(doc, 'Aportaciones en especie (terrenos y activos biológicos)', '', '442.000.000');
drawTableRow(doc, 'TOTAL APORTACIONES EN ESPECIE', '', '442.000.000');

doc.moveDown(1.5);
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('NOTA 9. RESULTADOS DE EJERCICIOS');
doc.moveDown(0.3);
doc.fillColor(textColor).font('Helvetica').fontSize(9.5).text('Corresponde a los resultados acumulados de ejercicios anteriores al periodo que se informa, originados durante la etapa de constitución y puesta en marcha de la entidad, los cuales disminuyen el patrimonio institucional.\n\nAl final del periodo gravable 2025, el saldo es el siguiente:');
doc.moveDown(0.5);
drawTableRow(doc, 'RESULTADOS DE EJERCICIOS', '', '2025', true);
drawTableRow(doc, 'Resultado del ejercicio años anteriores 2022-2024', '', '(169.000)');
drawTableRow(doc, 'Utilidad y/o pérdida ejercicios 2025', '', '(601.000)');
drawTableRow(doc, 'TOTAL RESULTADOS DE EJERCICIOS', '', '(829.000)');

// PAGE 8: NOTA 10 & SIGNATURES
doc.addPage();
drawHeader(doc);

doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10).text('REVELACIONES AL ESTADO DE RESULTADOS');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(9.5).text('NOTA 10. GASTOS OPERACIONALES – OTROS GENERALES');
doc.moveDown(0.3);
doc.font('Helvetica').fillColor(textColor).fontSize(9.5).text('Corresponde a los gastos generales en que incurrió la entidad durante el periodo comprendido entre el 1 de enero y el 31 de diciembre de 2025, asociados al funcionamiento administrativo y a los trámites propios de su puesta en marcha. Durante el periodo la entidad no percibió ingresos operacionales. El saldo es el siguiente:\n\nAl final del periodo gravable 2025, el saldo es el siguiente:');
doc.moveDown(0.5);
drawTableRow(doc, 'GASTOS OPERACIONALES – OTROS GENERALES', '', '2025', true);
drawTableRow(doc, 'Otros generales', '', '660.000');
drawTableRow(doc, 'TOTAL GASTOS', '', '660.000');

drawSignatures(doc, 500, true);

// Add page numbers in a second pass
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.save();
  doc.fillColor('#78716c').font('Helvetica').fontSize(8);
  doc.text(`Asociación Ganadera Campesina por la Paz (ASOGANCPAZ) - NIT: 901.660.410-6`, 60, 740, { width: 350 });
  doc.text(`Página ${i + 1} de ${range.count}`, 420, 740, { width: 132, align: 'right' });
  doc.restore();
}

doc.end();
console.log('Successfully created the professional signed PDF at:', outputPath);
