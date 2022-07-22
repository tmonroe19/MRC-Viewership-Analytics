const express = require('express')
const app = express()
const cors = require('cors')

const requestLogger = (request, response, next) => {
    console.log('Name:  ', request.name)
    console.log('Number:  ', request.number)
    console.log('---')
    next()
}

app.use(express.json())
app.use(requestLogger)
app.use(cors())


const CNSid = '314046407'
const TVid = '314085289'
const NBid = '314040560'

// Imports the Google Analytics Data API client library.
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();


app.get('/records', async (request, response, next) => {

    const data = {}

    data.CNS = await RunReportWorking(CNSid)
    data.TV = await RunReportWorking(TVid)
    data.NB = await RunReportWorking(NBid)

    response.json(data)
})

async function RunReportWorking(DivID) {

    const [division] = await analyticsDataClient.runRealtimeReport({
        property: `properties/${DivID}`,
        dimensions: [
            {
                name: 'unifiedScreenName',
            },
        ],
        metrics: [
            {
                name: 'activeUsers',
            },
        ],
    });

    // printRunReportResponse(division)

    // //return this :)
    const DivisionDataSet = division.rows
        .filter(row => {
            if ((row.dimensionValues[0].value == 'Page not found')) { return false }
            else if (row.dimensionValues[0].value.includes('(other)')) { return false }
            else { return true }
        })
        .slice(0, 10)
        .map(row => {
            let title = row.dimensionValues[0].value.split(' | ')[0]
            return {
                title,
                viewer: row.metricValues[0].value,
            }
        })

    console.log('DivisionDataSet = ', DivisionDataSet)
    return DivisionDataSet
}

// Runs a simple report.

process.on('unhandleRejection', err => {
    console.error(err.message)
    process.exitCode = 1
})

function printRunReportResponse(response) {

    console.log(`${response.rowCount} rows received`)

    response.dimensionHeaders.forEach(dimensionHeader => {

        console.log(`Dimension header name: ${dimensionHeader.name}`)
    })

    response.metricHeaders.forEach(metricHeader => {

        console.log(
            `Metric header name: ${metricHeader.name} (${metricHeader.type})`
        )
    })

    // let pipeEnd = NB.rows.dimensionValues[0].value.lastIndexOf('|')

    console.log('Report result:')
    const row = response.rows.slice(0, 10)

    row.map(row => {

        console.log(
            `${row.dimensionValues[0].value}, ${row.metricValues[0].value}`
        )
    })
}

const port = 3001
app.listen(port, () => console.log(`listing on port ${port}`))