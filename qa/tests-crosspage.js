const Browser = require('zombie')
const assert = require('chai').assert

let browser

suite('Cross-Page Tests',()=>{
  setup(()=>{
    browser = new Browser()
  })

  test(`requesting a group rate quote from the hood river tour page should populate the refferer field`,(done)=>{
    let referrer = `http://localhost:3000/tours/hood-river`
    browser.visit(referrer,()=>{
      browser.assert.className('a','requestGroupRate')
      done()
    })
  })

  test(`requesting a group rate from the oregon coast tour page should populate the refferer field`,(done)=>{
    let referrer = `http://localhost:3000/tours/oregon-coast`
    browser.visit(referrer,()=>{
      browser.assert.className('a','requestGroupRate')
      done()
    })
  })

  test(`visiting the "request group rate" page dirctly should result in an empty referrer field`,(done)=>{
    let referrer = `http://localhost:3000/tours/request-group-rate`
    browser.visit(referrer,()=>{
      browser.assert.attribute('input[name="referrer"]','value',null)
      done()
    })
  })
})