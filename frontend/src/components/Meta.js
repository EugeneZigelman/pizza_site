import React from 'react';
import  Helmet  from "react-helmet";

const Meta = ({ title, description, keywords }) => {

  // console.log('title, description, keywords', title, description, keywords)

  return (
    <Helmet>
      <title> {title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To ViaToledo!',
  keywords: 'пицца,pizza,פיצה',
  description: 'Итальянская пицца, italian pizza'
}

export default Meta

