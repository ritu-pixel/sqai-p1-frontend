'use client';

import { useRef } from 'react';

export default function ExtractedInvoiceTable({ data }) {
  if (!data) return null;

  const tableRef = useRef(null);

  // ✅ Improved format function
  const format = (val) => {
    if (val === undefined || val === null || val === '') {
      return <span className="text-gray-400 italic">N/A</span>;
    }

    // Clean numeric string check
    const numeric = parseFloat(val);
    const isNumeric =
      !isNaN(numeric) &&
      isFinite(numeric) &&
      /^\d+(\.\d+)?$/.test(val.toString());

    return isNumeric ? Number(numeric).toFixed(2) : val;
  };

  // 📥 Download JSON
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 📊 Download all visible tables as CSV
  const handleDownloadCSV = () => {
    if (!tableRef.current) return;

    let csv = '';
    const tables = tableRef.current.querySelectorAll('table');

    tables.forEach((table) => {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row) => {
        const cols = row.querySelectorAll('td, th');
        const rowData = Array.from(cols).map((col) =>
          `"${col.innerText.replace(/\n/g, ' ').trim()}"`
        );
        csv += rowData.join(',') + '\n';
      });
      csv += '\n'; // spacing between tables
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice_table.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-left space-y-6 mt-8">
      

      <div ref={tableRef}>
        {/* 🧾 Invoice Details */}
        <div>
          <h2 className="text-lg font-semibold mb-2">🧾 Invoice Details</h2>
          <table className="w-full border border-gray-300">
            <tbody>
              <tr><td className="border px-4 py-2">Invoice Number</td><td className="border px-4 py-2">{format(data.invoice_number)}</td></tr>
              <tr><td className="border px-4 py-2">Invoice Date</td><td className="border px-4 py-2">{format(data.invoice_date)}</td></tr>
              <tr><td className="border px-4 py-2">Due Date</td><td className="border px-4 py-2">{format(data.due_date)}</td></tr>
            </tbody>
          </table>
        </div>

        {/* 🏢 Vendor Details */}
        <div>
          <h2 className="text-lg font-semibold mb-2">🏢 Vendor Details</h2>
          <table className="w-full border border-gray-300">
            <tbody>
              <tr><td className="text-bold border px-4 py-2">Vendor Name</td><td className="border px-4 py-2">{format(data.vendor_name)}</td></tr>
              <tr><td className="border px-4 py-2">Vendor Address</td><td className="border px-4 py-2">{format(data.vendor_address)}</td></tr>
              <tr><td className="border px-4 py-2">GSTIN</td><td className="border px-4 py-2">{format(data.gstin)}</td></tr>
              <tr><td className="border px-4 py-2">Contact</td><td className="border px-4 py-2">{format(data.contact)}</td></tr>
            </tbody>
          </table>
        </div>

        {/* 📦 Line Items */}
        {data.line_items?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">📦 Line Items</h2>
            <table className="w-full border border-gray-300">
              <thead className="bg-black text-bold">
                <tr>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Unit Price</th>
                  <th className="border px-4 py-2">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {data.line_items.map((item, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{format(item.description)}</td>
                    <td className="border px-4 py-2">{format(item.quantity)}</td>
                    <td className="border px-4 py-2">{format(item.unit_price)}</td>
                    <td className="border px-4 py-2">{format(item.line_total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 💰 GST & Summary */}
        <div>
          <h2 className="text-lg font-semibold mb-2">💰 GST & Summary</h2>
          <table className="w-full border border-gray-300">
            <tbody>
              <tr><td className="border px-4 py-2">Tax Amount</td><td className="border px-4 py-2">{format(data.tax_amount)}</td></tr>
              <tr><td className="border px-4 py-2">Total Invoice Amount</td><td className="border px-4 py-2">{format(data.total_amount)}</td></tr>
              <tr><td className="border px-4 py-2">Purchase Order Number</td><td className="border px-4 py-2">{format(data.purchase_order_number)}</td></tr>
            </tbody>
          </table>
        </div>

        {/* 🚛 Transport / Shipping Info */}
        {(data.vehicle_number || data.shipping_mode || data.shipping_doc_no) && (
          <div>
            <h2 className="text-lg font-semibold mb-2">🚛 Transport / Shipping Info</h2>
            <table className="w-full border border-gray-300">
              <tbody>
                <tr><td className="border px-4 py-2">Vehicle Number</td><td className="border px-4 py-2">{format(data.vehicle_number)}</td></tr>
                <tr><td className="border px-4 py-2">Shipping Mode</td><td className="border px-4 py-2">{format(data.shipping_mode)}</td></tr>
                <tr><td className="border px-4 py-2">Shipping Doc No.</td><td className="border px-4 py-2">{format(data.shipping_doc_no)}</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 📥 Download Buttons */}
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={handleDownloadJSON}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ⬇️ Download JSON
        </button>
        <button
          onClick={handleDownloadCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          📊 Download Table (CSV)
        </button>
      </div>
    </div>
  );
}
