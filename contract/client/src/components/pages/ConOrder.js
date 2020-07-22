import React, { useState, useEffect } from "react"
import "../../styles/ConOrder.css"
import { Button, Icon, Table, Confirm } from "semantic-ui-react"
import moment from "moment"
import { useOrder, useLoad, useAuth } from "../../hooks"
import { Link } from "react-router-dom"

export default () => {
  const { orders, getOrder, approve, deny } = useOrder()
  const [ orderId, setOrderId ] = useState(null)
  const { setLoaded } = useLoad()
  const [ loading ] = useState("")
  const { user } = useAuth()
  const [ confirmOrder, setConfirm ] = useState(false)
  const [ denyOrder, setDeny ] = useState(false)
  console.log(orders)

  const openConfirm = () => setConfirm(true)
  const closeConfirm = () => setConfirm(false)

  const openDeny = () => setDeny(true)
  const closeDeny = () => setDeny(false)

  function processOrder(id, status) {
    setOrderId(id)
    if (status === "approved") {
      openConfirm()
    }
    if (status === "denied") {
      openDeny()
    }
  }

  
  useEffect(() => {
    setLoaded(true)
    getOrder().then(() => {
      setLoaded(false)
    })
  }, [])
  return (
    <div className="order">
      <Confirm
        content= "Would you like to confirm this order?"
        open={confirmOrder}
        onCancel={closeConfirm}
        onConfirm={() => approve(orderId).then(() => setConfirm(false))}
      />
      <Confirm
        content= "Would you like to deny this order?"
        open={denyOrder}
        onCancel={closeDeny}
        onConfirm={() => deny(orderId).then(() => setDeny(false))}
      />
      <div className="tableResize">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order #</Table.HeaderCell>
              <Table.HeaderCell>
                {user.contractor ? "Customer" : "Contractor"}
              </Table.HeaderCell>
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
                  <Table.Row>
                    <Table.Cell style={{width: "5%"}}>{order.id}</Table.Cell>
                    <Table.Cell style={{width: "10%"}}>
                      <Link 
                        style={{color: "cadetblue"}}
                        to={'/profile/' + order.profile_id}>{order.first_name} {order.last_name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell style={{width: "10%"}}>
                      {moment(order.date).subtract(10, "days").calendar()}
                    </Table.Cell>
                    <Table.Cell style={{width: "10%"}}>{order.services}</Table.Cell>
                    <Table.Cell style={{width: "15%"}}>$ {order.total}</Table.Cell>
                    <Table.Cell style={{width: "15%"}}>
                      <Button 
                        disabled={order.status != "pending"}
                        style={{
                          backgroundColor: "cadetblue",
                          color: "white",
                        }}
                        onClick={() => processOrder(order.id, "approved")}
                        > 
                        <Icon name="wrench" />
                      </Button>
                      <Button 
                        disabled={order.status != "pending"}
                        style={{
                          backgroundColor: "#f45858",
                          color: "white",
                        }}
                        onClick={() => processOrder(order.id, "denied")} icon>
                        deny
                      </Button>
                    </Table.Cell>
                    <Table.Cell style={{width: "5%"}}>
                      {order.status}
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
