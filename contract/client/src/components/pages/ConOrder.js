import React from 'react';
import '../../styles/ConOrder.css';
import { Button, Icon } from 'semantic-ui-react'

export default () => {


  return (
    <div className="background">
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
        <tbody class="">
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