var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

describe('making a post', function () {
    it('logs in and creates a new post', function () {
        browser.get('http://localhost:3000');
        element(by.css('nav .login')).click();
        // click 'login'
        element(by.css('nav .login')).click()

        // fill out and submit login form
        element(by.model('username')).sendKeys('')
        element(by.model('password')).sendKeys('')
        element(by.css('form .btn')).click()

        // submit a new post on the posts page
        var post = 'my new post' + Math.random();
        element(by.model('postBody')).sendKeys(post)
        element(by.css('form .btn')).click()
        // the user should now see their post as the first post on the page


        expect(element.all(by.css('ul.list-group li')).first().getText()).to.eventually.contain(post);

        /*
        element.all(by.css('ul.list-group li')).first().getText().then(function (text) {
            expect(text).to.contain(post)
        })
        */
    })
})
