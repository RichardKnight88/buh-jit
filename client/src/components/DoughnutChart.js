import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'


const DoughnutChart = (transactions) => {

  const [labelsArray, setLabelsArray] = useState([])
  const [transactionsArray, setTransactionsArray] = useState(null)

  console.log(transactions)
  // console.log(typeof (transactions))

  // setTransactionsArray(transactions)

  // transactionsArray && transactionsArray.map(item => {
  //   return console.log(item.id)
  // })


  const outgoingTransactions = transactions.transactions.filter(item => {
    return item.transaction_type === 'Outgoing'
  })


  const uniqueValues = []
  const getLabels = () => {
    outgoingTransactions.map(item => {
      // console.log('TYPE', typeof (item.label))
      // console.log('INDEX', uniqueValues.indexOf(item.label))
      if (uniqueValues.indexOf(item.label) < 0) {
        uniqueValues.push(item.label)
      }
      // console.log('UNIQUE VALUES', uniqueValues)

      if (outgoingTransactions.length > 0) {
        setLabelsArray(uniqueValues)
      } else {
        setLabelsArray([])
      }
    })
  }

  useEffect(() => {

    getLabels()
  }, [transactions])

  // labels.map(label => {

  // })

  // console.log('OUTGOING', outgoingTransactions)
  // console.log(transactions.transactions)


  const values = []

  labelsArray.map(label => {

    let total = 0

    // console.log('LABEL', label)

    outgoingTransactions.map(item => {
      if (item.label === label) {
        // console.log('ITEM', item)
        // console.log('AMOUNT', item.amount)
        return (
          total = total + item.amount
        )
      }
      // console.log('RUNNING TOTAL', total)

    })
    // console.log('FINAL TOTAL', total)
    values.push(total)
  })

  // console.log('VALUES', values)

  const data = {
    
    labels: labelsArray,
    datasets: [
      {
        data: values,
        
        backgroundColor: [
          'rgba(153, 0, 153, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(0, 179, 0, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(204, 0, 0, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderColor: [
          'rgba(153, 0, 153, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(0, 179, 0, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(204, 0, 0, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      }
    ],
  }

  const altData = {
    
    labels: ['No Transactions Yet'],
    datasets: [
      {
        data: [1],
        
        backgroundColor: [
          '#bbb'
        ],
        borderColor: [
          // 'rgba(153, 0, 153, 1)'
        ],
        borderWidth: 0,
      }
    ],
  }

  return (

    <Doughnut data={outgoingTransactions.length > 0 ? data : altData} />

  )

}

export default DoughnutChart