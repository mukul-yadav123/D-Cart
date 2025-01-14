import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'
import { useData } from '../../context/data/MyState'

const Order = () => {

  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const { mode, loading, order,getOrderData } = useData();
  useEffect(() => {
    getOrderData();
  },[])

  return (
    <Layout>
    {loading && <Loader />}
    {order.length > 0 ?
      (<>
        <div className=" h-full pt-10">
          {
            order.filter(obj => obj.userid == userid).map((order,ind) => {
              return (
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0" key={ind}>
                  {
                    order?.cartItems?.map((item,ind) => {
                      return (
                        <div className="rounded-lg md:w-2/3" key={ind}>
                          <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                            <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                                <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {item.price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </>)
      :
      (
        <h1 className=' text-center text-3xl' style={{ color: mode === 'dark' ? 'white' : '' }}>No Order</h1>
      )

    }
  </Layout>
  )
}

export default Order