import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.section}>{content}</Text>
    </Page>
  </Document>
);

export default MyDocument;