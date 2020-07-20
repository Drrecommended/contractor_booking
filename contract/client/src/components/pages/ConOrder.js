import React, { useState, useEffect } from "react"
import "../../styles/ConOrder.css"
import { Button, Icon, Table, Menu } from "semantic-ui-react"
import moment from "moment"
import { useOrder, useLoad, useAuth } from "../../hooks"
import { Link } from "react-router-dom"

export default () => {
  const { orders, getOrder, approve, deny } = useOrder()
  const { setLoaded } = useLoad()
  const [loading] = useState("")
  const { user } = useAuth()


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
              <Table.HeaderCell>{user.contractor ? "Customer" : "Contractor"}</Table.HeaderCell>

              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Services</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Order Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {orders.length !== 0 ? (
            <Table.Body>
              {orders.map((order) => {
                return (
                  <Table.Row className={{}}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>
                      <Link to={'/profile/' + order.profile_id}>{order.first_name} {order.last_name}</Link>
                    </Table.Cell>
                    <Table.Cell>
                      {moment(order.date).subtract(10, "days").calendar()}
                    </Table.Cell>
                    <Table.Cell>{order.services}</Table.Cell>
                    <Table.Cell>$ {order.total}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => approve(order.id)} icon>
                        <Icon name="wrench" />
                      </Button>
                      <Button onClick={() => deny(order.id)} icon>
                        deny
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      {order.status === "pending" ? "pending order" : "false"}{" "}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          ) : (
              <Table.Body>No orders yet! Check back soon!</Table.Body>
            )}
        </Table>
      </div>
    </div>
  )
}
