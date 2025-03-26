import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    section: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333'
    },
    text: {
        fontSize: 12,
        color: '#555'
    }
});

const MyDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {data.map((item, index) => (
                <View style={styles.section} key={index}>
                    <Text style={styles.header}>{item.title}</Text>
                    <Text style={styles.text}>{item.content}</Text>
                </View>
            ))}
        </Page>
    </Document>
);

const PDFGenerator = () => {
    const sampleData = [
        { title: 'Section 1', content: 'This is some content for section 1.' },
        { title: 'Section 2', content: 'This is some content for section 2.' },
        { title: 'Section 3', content: 'This is some content for section 3.' }
    ];

    return (
        <div>
            <h2>Download PDF</h2>
            <PDFDownloadLink document={<MyDocument data={sampleData} />} fileName="document.pdf">
                {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
        </div>
    );
};

export default PDFGenerator;