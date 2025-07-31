export const sampleHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sample Invoice</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .invoice-details { margin-bottom: 30px; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .items-table th { background-color: #f4f4f4; }
        .total { text-align: right; font-weight: bold; font-size: 18px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>INVOICE</h1>
        <p>Invoice #: INV-2024-001</p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
    </div>
    
    <div class="invoice-details">
        <h3>Bill To:</h3>
        <p>John Doe<br>
        123 Main Street<br>
        City, State 12345</p>
    </div>
    
    <table class="items-table">
        <thead>
            <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Product A</td>
                <td>High-quality widget</td>
                <td>2</td>
                <td>$50.00</td>
                <td>$100.00</td>
            </tr>
            <tr>
                <td>Product B</td>
                <td>Premium service</td>
                <td>1</td>
                <td>$75.00</td>
                <td>$75.00</td>
            </tr>
        </tbody>
    </table>
    
    <div class="total">
        <p>Total: $175.00</p>
    </div>
</body>
</html>`;
