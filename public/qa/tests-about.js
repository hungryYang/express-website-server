/*
*  about页面断言测试
*/

suite(`"About" Page Tests`,()=>{
  test('page should contain link to contact page',()=>{
    assert($('a[href="/contact"]').length);
  });
});