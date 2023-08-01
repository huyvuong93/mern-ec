import Product from "./Product";

export default function ProductList({products}) {

  return (
    <div className="row">
      {products && products.map((product) => {
        return (
          <div className="col-lg-6" key={product.code}>
            <Product product={product} />
          </div>
          )
      })}
    </div>
  )
}