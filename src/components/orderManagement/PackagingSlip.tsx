import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Svg,
  Path,
} from '@react-pdf/renderer';

export default function PackagingSlip({
  packing_slip_id,
  seller_pan_no,
  total_amount,
  seller_company_name,
  product_included_item,
  product_name,
  quantity,
}: {
  packing_slip_id: string;
  seller_pan_no: string;
  total_amount: string | number;
  seller_company_name: string;
  product_included_item: string;
  product_name: string;
  quantity: string;
}) {
  return (
    <PDFViewer
      style={{
        width: 900,
        height: 500,
      }}
    >
      <Document>
        <Page size="A4" style={{ padding: 20 }}>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  height: 90,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 85,
                    height: 30,
                  }}
                >
                  <Svg width="40" height="40" viewBox="0 0 90 94">
                    <Path
                      d="M36.7522 1.60155C22.3773 4.31136 11.0024 13.215 4.56491 26.7641C1.06494 34.0548 -0.0600537 38.9583 0.00244586 47.4104C0.00244586 59.9271 3.75242 69.7986 11.8774 78.7023C24.8773 92.9611 43.3771 97.542 60.752 90.7674C89.6268 79.5411 99.2518 42.9585 79.9394 17.925C73.7519 9.92455 63.002 3.40809 53.0646 1.60155C46.5021 0.440201 42.6896 0.440201 36.7522 1.60155ZM52.3771 10.9569C57.127 12.6344 61.9395 15.9249 65.752 19.9896C70.5645 25.2157 71.1895 27.3448 66.5645 22.6349C53.8146 9.731 36.7522 9.731 23.6898 22.6994C18.8148 27.4738 17.1273 28.0545 15.4398 25.4737C14.0023 23.2156 14.7523 21.7316 19.0648 18.054C23.5648 14.3119 29.1897 11.344 34.3147 9.98907C39.1897 8.76321 47.4396 9.15031 52.3771 10.9569ZM48.3146 16.6346C50.8146 17.9895 53.3146 22.4413 53.3146 25.4737C53.2521 26.5061 52.8771 28.2481 52.3771 29.3449L51.5646 31.2805L51.5021 28.5062C51.3771 20.9574 46.3771 17.4088 40.9397 21.0219C36.5022 23.9898 39.0022 32.2483 45.8146 37.0872C48.6896 39.1519 51.1271 43.023 51.7521 46.4426C52.3146 49.7331 50.0646 56.5721 47.3771 59.7336L45.1896 62.2498L46.5646 59.0239C48.3771 54.572 48.4396 48.5072 46.6896 45.9909C45.0021 43.5392 40.0647 41.0875 36.0647 40.7649C31.8147 40.3777 27.6273 42.3778 25.5023 45.7329C16.8773 59.3465 26.6898 76.3151 42.6271 75.3473C48.7521 75.0247 54.1271 72.1213 60.1895 65.8629C62.877 63.1531 65.3145 60.3143 65.6895 59.54C66.377 58.1851 66.3145 58.1206 62.1895 57.7335C59.877 57.4754 57.8145 57.2818 57.5645 57.2173C57.002 57.0883 73.4394 43.0876 74.5644 42.7004C75.0644 42.5069 75.1894 42.894 75.0019 43.6037C74.8144 44.3134 74.3144 49.2814 73.8769 54.7656L73.0644 64.6371L70.8145 61.9272L68.5645 59.2174L66.3145 62.9596C61.002 71.7342 54.1271 77.6055 46.3146 80.0572C40.6897 81.8638 36.0022 81.4121 30.1897 78.6378C19.4398 73.5407 13.8773 61.7982 16.6898 50.3137C19.0648 40.7003 24.7523 35.0226 32.5647 34.3129C34.3147 34.1839 35.8147 33.9258 35.8147 33.8613C35.8147 33.7968 35.3772 32.6354 34.8772 31.4095C33.5022 27.99 33.6897 22.8284 35.1897 20.3122C36.6897 17.7959 40.8772 15.4732 43.9396 15.4732C45.1271 15.4732 47.1271 15.9894 48.3146 16.6346Z"
                      fill="#C70101"
                    />
                  </Svg>
                  <View style={{ color: '#C70101' }}>
                    <Text>Hajur</Text>
                    <Text>Buwa</Text>
                  </View>
                </View>
                <View style={{ fontSize: 15 }}>
                  <Text>{seller_company_name} Trading Pvt. Ltd.</Text>
                  <Text>Tax Id: {seller_pan_no}</Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{}}>
                  <Text style={{ fontSize: 20 }}>PACKING SLIP</Text>
                  <Text>#PS-{packing_slip_id}</Text>
                </View>
                <View style={{ fontSize: 15 }}>
                  <Text>Balance Due</Text>
                  <Text>NPR {total_amount}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <View
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  justifyContent: 'space-between',
                }}
              >
                <Text># Item & Description</Text>
                <Text>Qty</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                borderBottom: 0.5,
                borderBottomStyle: 'solid',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingVertical: 7,
              }}
            >
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: 15,
                  }}
                >
                  <Text style={{ marginRight: 20 }}>1</Text>
                  <Text style={{ maxWidth: 200 }}>
                    {product_name} {product_included_item}
                  </Text>
                </View>
              </View>
              <View>
                <Text>{quantity}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
