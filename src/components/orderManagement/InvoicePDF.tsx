import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  StyleSheet,
  Svg,
  Path,
} from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateformat';

const COMPANY = {
  name: 'Hajurbuwa.com',
  addressLine1: 'Kathmandu',
  addressLine2: 'Nepal',
  email: 'info@hajurbuwa.com',
  phone: '9863437590',
  website: 'hajurbuwa.com',
};

export type InvoiceItem = {
  id: number | string;
  order_id: string | number;
  order_status: string;
  is_pickedup_or_above: boolean;
  product_name: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  amount_received: number;
  payment_status: string;
  order_date: string;
};

export type InvoiceBuyer = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

export type Invoice = {
  invoiceNo: string;
  orderDate: string;
  buyer: InvoiceBuyer;
  items: InvoiceItem[];
  deliveryCharge?: number;
};

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 9, color: '#1a1a1a' },
  brandRow: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  brandText: { color: '#C70101', marginLeft: 6, fontSize: 16, fontWeight: 700 },
  companyMeta: { textAlign: 'center', fontSize: 9, marginTop: 6, lineHeight: 1.4 },
  title: { fontSize: 16, fontWeight: 700, textAlign: 'center', marginTop: 18 },
  metaRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    paddingTop: 8,
  },
  billTo: { maxWidth: 250 },
  bold: { fontWeight: 700 },
  invoiceMeta: { textAlign: 'right', lineHeight: 1.5 },
  table: { marginTop: 16, borderWidth: 0.5, borderColor: '#888' },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 0.5,
    borderBottomColor: '#888',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  cell: { padding: 5, borderRightWidth: 0.5, borderRightColor: '#ccc' },
  cellNo: { width: '5%' },
  cellDesc: { width: '37%' },
  cellQty: { width: '11%', textAlign: 'right' },
  cellUnit: { width: '11%' },
  cellRate: { width: '13%', textAlign: 'right' },
  cellPer: { width: '10%' },
  cellAmount: { width: '13%', textAlign: 'right', borderRightWidth: 0 },
  totalsWrap: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 4 },
  totalsBox: { width: '45%' },
  totalsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  totalsRowStrong: { backgroundColor: '#f0f0f0', fontWeight: 700 },
  balance: { color: '#C70101', fontWeight: 700 },
  footer: { marginTop: 30, fontSize: 8, color: '#888' },
});

const HajurbuwaLogo = () => (
  <Svg width="34" height="34" viewBox="0 0 90 94">
    <Path
      d="M36.7522 1.60155C22.3773 4.31136 11.0024 13.215 4.56491 26.7641C1.06494 34.0548 -0.0600537 38.9583 0.00244586 47.4104C0.00244586 59.9271 3.75242 69.7986 11.8774 78.7023C24.8773 92.9611 43.3771 97.542 60.752 90.7674C89.6268 79.5411 99.2518 42.9585 79.9394 17.925C73.7519 9.92455 63.002 3.40809 53.0646 1.60155C46.5021 0.440201 42.6896 0.440201 36.7522 1.60155ZM52.3771 10.9569C57.127 12.6344 61.9395 15.9249 65.752 19.9896C70.5645 25.2157 71.1895 27.3448 66.5645 22.6349C53.8146 9.731 36.7522 9.731 23.6898 22.6994C18.8148 27.4738 17.1273 28.0545 15.4398 25.4737C14.0023 23.2156 14.7523 21.7316 19.0648 18.054C23.5648 14.3119 29.1897 11.344 34.3147 9.98907C39.1897 8.76321 47.4396 9.15031 52.3771 10.9569ZM48.3146 16.6346C50.8146 17.9895 53.3146 22.4413 53.3146 25.4737C53.2521 26.5061 52.8771 28.2481 52.3771 29.3449L51.5646 31.2805L51.5021 28.5062C51.3771 20.9574 46.3771 17.4088 40.9397 21.0219C36.5022 23.9898 39.0022 32.2483 45.8146 37.0872C48.6896 39.1519 51.1271 43.023 51.7521 46.4426C52.3146 49.7331 50.0646 56.5721 47.3771 59.7336L45.1896 62.2498L46.5646 59.0239C48.3771 54.572 48.4396 48.5072 46.6896 45.9909C45.0021 43.5392 40.0647 41.0875 36.0647 40.7649C31.8147 40.3777 27.6273 42.3778 25.5023 45.7329C16.8773 59.3465 26.6898 76.3151 42.6271 75.3473C48.7521 75.0247 54.1271 72.1213 60.1895 65.8629C62.877 63.1531 65.3145 60.3143 65.6895 59.54C66.377 58.1851 66.3145 58.1206 62.1895 57.7335C59.877 57.4754 57.8145 57.2818 57.5645 57.2173C57.002 57.0883 73.4394 43.0876 74.5644 42.7004C75.0644 42.5069 75.1894 42.894 75.0019 43.6037C74.8144 44.3134 74.3144 49.2814 73.8769 54.7656L73.0644 64.6371L70.8145 61.9272L68.5645 59.2174L66.3145 62.9596C61.002 71.7342 54.1271 77.6055 46.3146 80.0572C40.6897 81.8638 36.0022 81.4121 30.1897 78.6378C19.4398 73.5407 13.8773 61.7982 16.6898 50.3137C19.0648 40.7003 24.7523 35.0226 32.5647 34.3129C34.3147 34.1839 35.8147 33.9258 35.8147 33.8613C35.8147 33.7968 35.3772 32.6354 34.8772 31.4095C33.5022 27.99 33.6897 22.8284 35.1897 20.3122C36.6897 17.7959 40.8772 15.4732 43.9396 15.4732C45.1271 15.4732 47.1271 15.9894 48.3146 16.6346Z"
      fill="#C70101"
    />
  </Svg>
);

const money = (n: number) =>
  `RS ${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function InvoicePage({
  invoiceNo,
  orderDate,
  buyer,
  items,
  deliveryCharge = 0,
}: Invoice) {
  const subTotal = items.reduce((sum, it) => sum + Number(it.amount || 0), 0);
  const delivery = Number(deliveryCharge || 0);
  const total = subTotal + delivery;
  const paid = items.reduce((sum, it) => sum + Number(it.amount_received || 0), 0);
  const balance = total - paid;
  const totalQty = items.reduce((sum, it) => sum + Number(it.quantity || 0), 0);
  const dated = orderDate ? formatDate(orderDate) : '';

  return (
    <Page size="A4" style={styles.page}>
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.brandRow}>
            <HajurbuwaLogo />
            <Text style={styles.brandText}>{COMPANY.name}</Text>
          </View>
        </View>
        <View style={styles.companyMeta}>
          <Text>{COMPANY.addressLine1}</Text>
          <Text>{COMPANY.addressLine2}</Text>
          <Text>{`${COMPANY.email}, ${COMPANY.phone}`}</Text>
        </View>
      </View>

      <Text style={styles.title}>Estimate Invoice</Text>

      <View style={styles.metaRow}>
        <View style={styles.billTo}>
          <Text style={{ fontStyle: 'italic' }}>Bill To:</Text>
          <Text style={styles.bold}>{buyer.name}</Text>
          {buyer.address ? <Text>{buyer.address}</Text> : null}
          {buyer.phone ? <Text>{buyer.phone}</Text> : null}
          {buyer.email ? <Text>{buyer.email}</Text> : null}
        </View>
        <View style={styles.invoiceMeta}>
          <Text style={styles.bold}>{`Invoice No.: ${invoiceNo}`}</Text>
          <Text>{`Dated: ${dated}`}</Text>
          <Text>{`Due Date: ${dated}`}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.cellNo, styles.bold]}>#</Text>
          <Text style={[styles.cell, styles.cellDesc, styles.bold]}>Description</Text>
          <Text style={[styles.cell, styles.cellQty, styles.bold]}>QTY</Text>
          <Text style={[styles.cell, styles.cellUnit, styles.bold]}>Units</Text>
          <Text style={[styles.cell, styles.cellRate, styles.bold]}>Rate</Text>
          <Text style={[styles.cell, styles.cellPer, styles.bold]}>Per</Text>
          <Text style={[styles.cell, styles.cellAmount, styles.bold]}>Amount</Text>
        </View>
        {items.map((it, idx) => (
          <View style={styles.tableRow} key={it.id}>
            <Text style={[styles.cell, styles.cellNo]}>{idx + 1}</Text>
            <Text style={[styles.cell, styles.cellDesc]}>{it.product_name}</Text>
            <Text style={[styles.cell, styles.cellQty]}>{Number(it.quantity).toFixed(2)}</Text>
            <Text style={[styles.cell, styles.cellUnit]}>{it.unit}</Text>
            <Text style={[styles.cell, styles.cellRate]}>{Number(it.rate).toFixed(2)}</Text>
            <Text style={[styles.cell, styles.cellPer]}>{it.unit}</Text>
            <Text style={[styles.cell, styles.cellAmount]}>{Number(it.amount).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.cellNo]}></Text>
          <Text style={[styles.cell, styles.cellDesc]}></Text>
          <Text style={[styles.cell, styles.cellQty]}></Text>
          <Text style={[styles.cell, styles.cellUnit]}></Text>
          <Text style={[styles.cell, styles.cellRate]}></Text>
          <Text style={[styles.cell, styles.cellPer, styles.bold]}>Sub Total</Text>
          <Text style={[styles.cell, styles.cellAmount, styles.bold]}>{subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.cellNo]}></Text>
          <Text style={[styles.cell, styles.cellDesc]}></Text>
          <Text style={[styles.cell, styles.cellQty]}></Text>
          <Text style={[styles.cell, styles.cellUnit]}></Text>
          <Text style={[styles.cell, styles.cellRate]}></Text>
          <Text style={[styles.cell, styles.cellPer, styles.bold]}>Delivery Charge</Text>
          <Text style={[styles.cell, styles.cellAmount, styles.bold]}>{delivery.toFixed(2)}</Text>
        </View>
        <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
          <Text style={[styles.cell, styles.cellNo, styles.bold]}>Total</Text>
          <Text style={[styles.cell, styles.cellDesc]}></Text>
          <Text style={[styles.cell, styles.cellQty, styles.bold]}>{totalQty.toFixed(2)}</Text>
          <Text style={[styles.cell, styles.cellUnit]}></Text>
          <Text style={[styles.cell, styles.cellRate]}></Text>
          <Text style={[styles.cell, styles.cellPer]}></Text>
          <Text style={[styles.cell, styles.cellAmount, styles.bold]}>{money(total)}</Text>
        </View>
      </View>

      <View style={styles.totalsWrap}>
        <View style={styles.totalsBox}>
          <View style={styles.totalsRow}>
            <Text style={styles.bold}>Paid</Text>
            <Text>{money(paid)}</Text>
          </View>
          <View style={[styles.totalsRow, styles.totalsRowStrong]}>
            <Text style={styles.balance}>Balance</Text>
            <Text style={styles.balance}>{money(balance)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.footer}>{COMPANY.website}</Text>
    </Page>
  );
}

export default function InvoicePDF({ invoices }: { invoices: Invoice[] }) {
  return (
    <PDFViewer style={{ width: 1000, height: 760 }}>
      <Document>
        {invoices.map((inv, i) => (
          <InvoicePage
            key={i}
            invoiceNo={inv.invoiceNo}
            orderDate={inv.orderDate}
            buyer={inv.buyer}
            items={inv.items}
            deliveryCharge={inv.deliveryCharge}
          />
        ))}
      </Document>
    </PDFViewer>
  );
}
