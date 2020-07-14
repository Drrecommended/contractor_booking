import React, { useState, useEffect } from 'react';
import '../../styles/ConOrder.css';
import { Button, Icon, Table, Menu } from 'semantic-ui-react'
import moment from 'moment'
import { useOrder, useLoad } from '../../hooks'


export default () => {
  const { orders, getOrder, approve, deny } = useOrder()
  const { setLoaded } = useLoad()
  const [ loading ] = useState('')


  useEffect(() => {
    setLoaded(true)
    getOrder().then(() => {
      setLoaded(false)
    })
  }, [])
  return (
    <div className="order">
      <div className="tableResize">      
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order #</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Services</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {orders.length !== 0 ? 
        <Table.Body>
          {orders.map(order => {
            return (
              <Table.Row className={{}}>
                <Table.Cell>{order.id}</Table.Cell>
                <Table.Cell>{order.first_name} {order.last_name}</Table.Cell>
                <Table.Cell>{moment(order.date).subtract(10, 'days').calendar()}</Table.Cell>
                <Table.Cell>{order.services}</Table.Cell>
                <Table.Cell>$ {order.total}</Table.Cell>
                <Table.Cell>   
                  {order.status === "pending" ? "pending order" : "false"}       
                  <Button onClick={() => approve(order.id)} icon>
                    <Icon name='wrench' />
                  </Button>
                  <Button onClick={() => deny(order.id)} icon>
                    deny 
                  </Button>
                </Table.Cell>
              </Table.Row>
          )
        })}
        </Table.Body> : 
        
        <Table.Body>No orders yet! Check back soon!</Table.Body>}

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell onClick="" colSpan='6'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>

  )
}
