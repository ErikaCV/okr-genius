import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 60, // Ajusta el tamaño según tus necesidades
    height: 60, // Ajusta el tamaño según tus necesidades
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    borderBottomStyle: 'solid',
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    textAlign: 'justify',
  },
});

const MyDocument = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>OKR Genius</Text>
        
      </View>
      <View style={styles.line}></View>
      <Text style={styles.content}>{content}</Text>
    </Page>
  </Document>
);

export default MyDocument;