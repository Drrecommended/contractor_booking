import React, { useState, useEffect } from "react"
import "../../styles/ConOrder.css"
import { Button, Icon, Table, Confirm } from "semantic-ui-react"
import moment from "moment"
import { useOrder, useLoad, useAuth } from "../../hooks"
import { Link } from "react-router-dom"

export default () => {
  const { order, getOrder, approve, deny } = useOrder()
  console.log(getOrder)
  console.log(order)
  const { setLoaded } = useLoad()
  const [ loading ] = useState("")
  const { user } = useAuth()
  const [ confirmOrder, setConfirm ] = useState(false)
  const [ denyOrder, setDeny ] = useState(false)

  const openConfirm = () => setConfirm(true)
  const closeConfirm = () => setConfirm(false)

  const openDeny = () => setDeny(true)
  const closeDeny = () => setDeny(false)


  
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
        onConfirm={() => approve(order.id).then(() => setConfirm(false))}
      />
      <Confirm
        content= "Would you like to deny this order?"
        open={denyOrder}
        onCancel={closeDeny}
        onConfirm={() => deny(order.id).then(() => setDeny(false))}
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
          {order.length !== 0 ? (
            <Table.Body>
              {order.map((orders) => {
                return (
                  <Table.Row className={{}}>
                    <Table.Cell style={{width: "80px"}}>{orders.id}</Table.Cell>
                    <Table.Cell style={{width: "100px"}}>
                      <Link 
                        style={{color: "cadetblue"}}
                        to={'/profile/' + orders.profile_id}>{orders.first_name} {orders.last_name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell style={{width: "100px"}}>
                      {moment(orders.date).subtract(10, "days").calendar()}
                    </Table.Cell>
                    <Table.Cell style={{width: "150px"}}>{orders.services}</Table.Cell>
                    <Table.Cell style={{width: "80px"}}>$ {orders.total}</Table.Cell>
                    <Table.Cell style={{width: "60px"}}>
                      <Button 
                        style={{
                          backgroundColor: "cadetblue",
                          color: "white",
                        }}
                        onClick={openConfirm} icon>
                        <Icon name="wrench" />
                      </Button>
                      <Button 
                        style={{
                          backgroundColor: "#f45858",
                          color: "white",
                          
                        }}
                        onClick={openDeny} icon>
                        deny
                      </Button>
                    </Table.Cell>
                    <Table.Cell style={{width: "80px"}}>
                      {orders.status}
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
