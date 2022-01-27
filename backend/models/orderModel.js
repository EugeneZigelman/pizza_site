import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      diameter: {
        type: Number,
        required: true
      },
      size: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
    }
  ],
  shippingAddress: {
    address: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    postalCode: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false,
    },
  },
  paymentMethod: {
    type: String,
    required: true
  },

  shippingMethod: {
    type: String,
    required: true
  },
  shippingTelephone: {
    type: String,
    required: true
  },

  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
    required: false
  },
  taxPrice: {
    type: Number,
    required: false,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: false,
    default: false
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: false,
    default: false
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;