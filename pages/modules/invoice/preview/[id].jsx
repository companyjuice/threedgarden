'use client'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import Preview from '#/ui/modules/invoice/preview/Preview'

const InvoicePreview = ({ id }) => {
  return <Preview id={id} />
}

export const getStaticPaths = async () => {
  const res = await axios.get('/ui/modules/invoice/invoices')
  const data = await res.data.allData

  const paths = data.map((item) => ({
    params: { id: `${item.id}` },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = ({ params }) => {
  return {
    props: {
      id: params?.id,
    },
  }
}

export default InvoicePreview
