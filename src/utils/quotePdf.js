import PropTypes from 'prop-types';
import { stringifyClientName, lineItemTotal, processQuoteDetails } from './quotes';
import moment from 'moment';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const quotePdf = (action = '', quote = {}) => {

  const {
    name: title = '',
    poso = '',
    estimateId = '',
    createdAt = '',
    lineItems = [],
    client = {},
    propertyAddress: {
      street1 = '',
      street2 = '',
      city = '',
      state = '',
      zipCode = '',
      country = ''
    } = {}
  } = quote;

  let _createdAt = moment(createdAt).format('MMM DD, YYYY');
  let items = lineItems.map((lineItem) => {
    const { item: { name = '' } = {} } = lineItem;
    const { description = '', qty = '', unitCost = '' } = lineItem;
    const total = lineItemTotal(lineItem);
    return (
      [name, description, { text: qty, style: 'numbers' }, { text: '$' + unitCost, style: 'numbers' }, { text: '$' + total, style: 'numbers' }]
    )
  });
  const qDetails = processQuoteDetails(quote);
  const customerName = stringifyClientName(client);

  let billToDetails = [];

  if (client.company) {
    billToDetails.push(`\n\n${client.company}`);
  }

  if (customerName && client.company) {
    billToDetails.push(`\n${customerName}`);
  } else if (customerName && !client.company) {
    billToDetails.push(`\n\n${customerName}`);
  }

  if (street1 || street2) {
    billToDetails.push(`\n${street1} ${street2}`);
  }

  if (city || state || zipCode) {
    billToDetails.push(`\n${city && city + ','} ${state} ${zipCode}`);
  }

  if (country) {
    billToDetails.push(`\n${country}`)
  }

  pdfMake.tableLayouts = {
    exampleLayout: {
      hLineWidth: function (i, node) {
        return 1;
      },
      vLineWidth: function (i) {
        return 0;
      },
      hLineColor: function (i) {
        return i === 1 ? '#dedede' : 'lightgray';
      },
      paddingTop: function (i) {
        return 5
      },
      paddingBottom: function (i) {
        return 5
      }
    }
  };

  var dd = {
    content: [
      {
        columns: [
          {
            width: '*',
            text: 'Service Desk Inc.',
            style: 'logo'
          },
          {
            width: '*',
            alignment: 'right',
            text: [
              {
                text: 'Price Quote',
                style: 'rightLogo'
              },
              {
                text: '\nExcellent service for businesses all over the world',
                style: 'rightSubheading'
              }
            ],
          }
        ],
        style: 'headerSection'
      },
      { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
      {
        columns: [
          {
            margin: [0, 20, 20, 0],
            text: [
              {
                text: 'BILL FROM',
                style: 'heading',
              },
              '\n\nService Desk Inc.',
              '\n334 North Ogden Venue Chicago, illenes 60678',
              '\nUnited States'

            ],
            style: 'para'
          },
          {
            margin: [0, 20, 20, 0],
            text: [
              {
                text: 'BILL TO',
                style: 'heading'
              },
              {
                text: [
                  ...billToDetails
                ]
              }
            ],
            style: 'para'
          },
          [
            { margin: 10, text: '' },
            {
              columns: [
                {
                  text: 'Job Title',
                  alignment: 'right',
                  style: 'heading',
                  // 	margin: [0, 0, 10, 0],
                  width: '30%'
                },
                {
                  margin: [0, 0, 0, 5],
                  text: title,
                  style: 'para',
                  alignment: 'right',
                  width: '70%'
                }
              ],
              alignment: 'right'
            },
            {
              columns: [
                {
                  text: 'Quote No.',
                  style: 'heading',
                  alignment: 'right',
                  width: '30%'
                },
                {
                  margin: [0, 0, 0, 5],
                  text: estimateId,
                  style: 'para',
                  alignment: 'right',
                  width: '70%'
                }
              ]
            },
            {
              columns: [
                {
                  text: 'P.O/S.O',
                  style: 'heading',
                  alignment: 'right',
                  width: '30%'
                },
                {
                  margin: [0, 0, 0, 5],
                  text: poso,
                  style: 'para',
                  alignment: 'right',
                  width: '70%'
                }
              ]
            },
            {
              columns: [
                {
                  text: 'Issue Date',
                  style: 'heading',
                  alignment: 'right',
                  width: '30%'
                },
                {
                  text: _createdAt,
                  style: 'para',
                  alignment: 'right',
                  width: '70%'
                }
              ]
            }
          ]
        ]
      },
      {
        margin: [0, 20, 0, 0],
        layout: 'exampleLayout', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ['*', '*', '10%', '10%', '10%'],
          padding: 10,
          body: [
            [{ text: 'Product / Service', style: 'filledHeader' }, { text: 'Description', style: 'filledHeader' }, { text: 'QTY', style: 'filledHeader', alignment: 'right' }, { text: 'Price', style: 'filledHeader', alignment: 'right' }, { text: 'Total', style: 'filledHeader', alignment: 'right' }],
            ...items
          ],
        },
        fontSize: 10,
        color: '#666'
      },
      {
        margin: [0, 30, 0, 0],
        columns: [
          {},
          {},
          [
            {
              columns: [
                { text: 'Sub Total', style: 'boxHeading' },
                { text: '$' + qDetails.subTotal || '0', style: 'boxPara' },
              ]
            },
            {
              columns: [
                { text: 'Discount', style: 'boxHeading' },
                { text: '$' + qDetails.discountAmount || '0', style: 'boxPara' },
              ]
            },
            {
              columns: [
                { text: 'Tax', style: 'boxHeading' },
                { text: '$' + (qDetails.taxAmount || '0'), style: 'boxPara' },
              ]
            },
            {
              columns: [
                { text: 'Deposit', style: 'boxHeading' },
                { text: '$' + qDetails.depositAmount || '0', style: 'boxPara' },
              ]
            },
            {
              layout: 'exampleLayout',
              table: {
                headerRows: 1,

                widths: ['*', '*'],
                body: [
                  [{ text: 'Total', bold: true }, { text: '$' + qDetails.gTotal || '0', alignment: 'right', bold: true }]
                ]
              }
            }
          ]
        ]
      }
    ],
    styles: {
      logo: {
        fontSize: 14,
        bold: true,
        italic: true,
        color: 'steelblue'
      },
      rightLogo: {
        fontSize: 20,
        bold: true,
        color: '#444'
      },
      rightSubheading: {
        fontSize: 10,
        color: 'gray'
      },
      headerSection: {
      },
      heading: {
        fontSize: 10,
        bold: true
      },
      para: {
        fontSize: 9,
        bold: false
      },
      filledHeader: {
        bold: true,
        // fontSize: 14,
        color: '#333',
        fillColor: '#dedede',
        // alignment: 'center'
      },
      numbers: {
        alignment: 'right'
      },
      boxHeading: {
        bold: true,
        margin: [0, 0, 0, 10]
      },
      boxPara: {
        alignment: 'right'
      },
      totalHeading: {
        bold: true,
      }
    }
  }

  if (typeof pdfMake.createPdf(dd)[action] === 'function') {
    pdfMake.createPdf(dd)[action]();
  }
}

quotePdf.propTypes = {
  action: PropTypes.string,
  quote: PropTypes.object
};

export default quotePdf;
