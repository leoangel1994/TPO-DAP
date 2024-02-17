import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarrouselItem'

const CarouselCards = ({navigation, data}: {navigation: any, data: any}) => {
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={({item, index} : any ) => {return <CarouselCardItem item={item} index={index} navigation={navigation}/>}}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        vertical={false}
      />
    </View>
  )
}


export default CarouselCards