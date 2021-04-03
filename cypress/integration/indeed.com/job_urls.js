// <reference types="cypress" />

const COUNTRY_CODE = 'au'
const BASE_URL = `https://${COUNTRY_CODE}.indeed.com`
const JOB_KEYWORDS = 'data+science'
const JOB_TOTAL_COUNT = 2432

function range(start, stop, step) {
    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
}

const PAGINATION_CHUNK = range(0, JOB_TOTAL_COUNT, 10)

describe('Collecting Data', () => {
    PAGINATION_CHUNK.forEach(chunk => {
        describe(`Paginating to this chunk: ${chunk}`, () => {
            it(`get the urls for ${chunk}`, () => {
                        const JOB_URLS = []
                        cy.visit(`${BASE_URL}/jobs?q=${JOB_KEYWORDS}&start=${chunk}`)
                        cy.get('.jobtitle').each(($a, index) => {
                            JOB_URLS.push($a[0].href)
                        }).then(() => {
                            const formatted_urls = JOB_URLS.join("\r\n")
                            // console.log(`completed for chunk: ${chunk}`)
                            // cy.task('log', JOB_URLS.join("\r\n"))
                            cy.writeFile(`./output/${COUNTRY_CODE}-${JOB_KEYWORDS}.csv`, formatted_urls, {flag: "a+"})
                        })
            })
        })
    })
})