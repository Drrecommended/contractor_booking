import React, { useState, useEffect } from 'react';
import '../../styles/ConOrder.css';
import { Button, Icon } from 'semantic-ui-react'
import { useOrder } from '../../hooks'

export default () => {
  const { order, getOrder } = useOrder()


  useEffect(() => {
    getOrder()
  }, [])
  return (
    <div className="background">
      <div id="header-style" class="ui clearing segment">
        <h2 class="ui right floated header">
          <Button icon>
            <Icon name='home' />
          </Button>
        </h2>
        <h2 class="ui left floated header">
          <Button icon>
            <Icon name='search' />
          </Button>
        </h2>
      </div>
      <table id="table">
        <thead class="headColor">
          <tr class="">
            <th class="">Order #</th>
            <th class="">Customer</th>
            <th class="">Date</th>
            <th class="">Services</th>
            <th class="">Total</th>
            <th class="">Actions</th>
          </tr>
        </thead>
        <tbody className="borderBottom">
          <tr class="">
            <td class="">{order.orderNumber}</td>
            <td class="">{order.orderName}</td>
            <td class="">{order.orderDate}</td>
            <td class="">{order.orderServices}</td>
            <td class="">{order.orderTotal}</td>
            <td class="buttons">
              <Button icon>
                <Icon name='wrench' />
              </Button>
              <Button icon>
                deny 
              </Button>
            </td>
          </tr>
          <tr class="">
            <td class="">3298472348032</td>
            <td class="">Bill Murray</td>
            <td class="">22/22/22</td>
            <td class="">Painted Lawn</td>
            <td class="">Cost</td>
            <td class="">
              <Button icon>
                <Icon name='wrench' />
              </Button>
              <Button icon>
                deny 
              </Button>
            </td>
          </tr>
          <tr class="">
            <td class="">3298472348032</td>
            <td class="">Bill Murray</td>
            <td class="">22/22/22</td>
            <td class="">Painted Lawn</td>
            <td class="">Cost</td>
            <td class="">
              <Button icon>
                <Icon name='wrench' />
              </Button>
              <Button icon>
                deny 
              </Button>
            </td>
          </tr>
        </tbody>
        <tfoot class="">
          <tr class="">
            <th class="">3 People</th>
            <th class="">2 Approved</th>
            <th class=""></th>
            <th class=""></th>
            <th class=""></th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

// const [order] = useState({
//   orderNumber: "3298472348032",
//   orderName: "Bill Murray",
//   orderDate: "2/22/22",
//   orderServices: "Moved Furniture",
//   orderTotal: "$120.00"
// })