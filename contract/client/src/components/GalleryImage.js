import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Button, Icon } from 'semantic-ui-react'

export default (props) => {
    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={200}
            totalSlides={props.images.length}
            visibleSlides={3}
        >
            <Slider>
                {props.images.map((item, index) => {
                    return (
                        <Slide key={index} index={index}>
                            <div style={{
                                marginRight: '10px',
                                marginLeft: '10px',
                                height: '200px',
                                backgroundImage: `url(${item.image})`,
                                backgroundRepeat: 'no-repeat',
                                position: "relative"

                            }}>
                                {/* <Image isBgImage="true" src={item.src} alt=""/> */}
                                {props.isEditable ?
                                    <Button onClick={() => props.onDelete(item.id)} icon style={{
                                        position: "absolute",
                                        margin: "5px",
                                        right: 0

                                    }}>
                                        <Icon name='trash' />
                                    </Button>
                                    :
                                    null

                                }

                            </div>

                        </Slide>
                    )
                })}
            </Slider>
            <Button.Content>
                <ButtonBack className="slider-btn" icon='left chevron' content='Forward' />
                <ButtonNext className="slider-btn" icon='right chevron' content='Back' />
            </Button.Content>
        </CarouselProvider>
    )
}