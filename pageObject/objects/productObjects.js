export const productInput = "//input[@id='search_product']";
export const productSreachBar = "//button[@id='submit_search']";
export const productName = "//div[@class='single-products']/div/p";
// export const productPrice = "//div[@class='single-products']/div/h2";
export const productPrice = "//p[text()='?????']/preceding-sibling::h2";
export const viewProduct =
  "//p[text()='?????']/ancestor::div[@class='single-products']/following-sibling::div//a";

export const productsCategory = "//a[text()[normalize-space() = '?????']]";
export const productsSubCategory = "//div[@id='Women']//li/a[text()[normalize-space() = '?????']]";
export const titleProductsPage = "//div[@class='features_items']/h2";
export const productAddtoCart =
  "//div[contains(@class,'productinfo')]//p[text()='?????']/following-sibling::a";
export const continueShoppingButton = "//button[contains(text(),'Continue Shopping')]";
export const cartButton = "//a[text()[normalize-space() = 'Cart']]";
