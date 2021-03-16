export const testDataArray = [
  {
    id: "6406132b-4aca-49dc-b102-c088e0c2f642",
    position: 1,
    deliveryMethod: null,
    isDeleted: false,
    riderId: "9c25016f-056a-492e-b9e1-78909589554b",
    dispatchDistributionId: "260f8390-6953-4bf1-9053-d2621ce5f114",
    createdAt: "2021-03-10T07:40:47.158Z",
    updatedAt: "2021-03-10T16:20:52.362Z",
    dispatch_orders: [
      {
        id: "d9b0bcfe-ec8b-4cf8-9645-e2fae1284640",
        dispatchId: "6406132b-4aca-49dc-b102-c088e0c2f642",
        orderId: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
        position: 1,
        status: "pending",
        createdAt: "2021-03-10T07:40:47.199Z",
        updatedAt: "2021-03-10T19:17:59.256Z",
        order: {
          id: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
          storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
          customerId: "19ba368c-8acd-4c11-965b-f9cc1cb4fbd2",
          isDeleted: false,
          status: "ready for dispatch",
          specialNote: null,
          deliveryLocation: {
            address: "Maroko, Lagos, Nigeria",
            latitude: 6.435820199999999,
            longitude: 3.4471546,
            customerId: "19ba368c-8acd-4c11-965b-f9cc1cb4fbd2",
          },
          recipient: {
            name: "Udoka ",
            phoneNumber: "00888888888",
          },
          itemsCompletionStatus: null,
          taxPercentage: 0,
          discountType: null,
          discountValue: 0,
          total: 183500,
          grandTotal: 183500,
          deliveryDate: null,
          deliveryMethod: null,
          createdAt: "2020-11-23T08:22:40.895Z",
          updatedAt: "2021-02-12T11:23:34.560Z",
          deliveryTypeId: "f71a287b-5870-4627-bd44-bd4eb476fea2",
          customer: {
            id: "19ba368c-8acd-4c11-965b-f9cc1cb4fbd2",
            name: "Udoka ",
            phoneNumber: "00888888888",
            address: "Oniru",
            addressDescription: null,
            pin: null,
            email: null,
            isDeleted: false,
            storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
            createdAt: "2020-11-23T08:22:31.803Z",
            updatedAt: "2021-02-10T08:38:22.101Z",
          },
          order_items: [
            {
              id: "4d8b3b20-3135-4918-8f97-e3a209bf6612",
              productId: "67d09f46-17a4-4c97-91d9-efe1be4abe49",
              quantity: 3,
              quantityAvailableForDispatch: 0,
              orderId: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
              createdAt: "2021-02-10T08:38:22.580Z",
              updatedAt: "2021-02-10T08:38:22.580Z",
              product: {
                id: "67d09f46-17a4-4c97-91d9-efe1be4abe49",
                name: "Carrot Cake",
                unitPrice: 12500,
                isDeleted: false,
                imageUrl:
                  "https://s3.eu-west-2.amazonaws.com/zupa.dev.intelia.io/images/logos/NzXLGHiO-1605774082635-carrot-cake-3.jpg",
                storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
                createdAt: "2020-11-19T08:22:28.794Z",
                updatedAt: "2020-11-19T08:22:28.808Z",
                baseProductId: "51f2fbd2-9354-4cae-986b-8478aeba5320",
                categorySizeId: "2bcf0918-b474-4a59-89f2-295b5b04c711",
              },
            },
            {
              id: "99d61d3a-e2d8-4208-af67-af41865ab6d8",
              productId: "67d09f46-17a4-4c97-91d9-efe1be4abe49",
              quantity: 4,
              quantityAvailableForDispatch: 0,
              orderId: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
              createdAt: "2021-02-10T08:38:22.581Z",
              updatedAt: "2021-02-10T08:38:22.581Z",
              product: {
                id: "67d09f46-17a4-4c97-91d9-efe1be4abe49",
                name: "Carrot Cake",
                unitPrice: 12500,
                isDeleted: false,
                imageUrl:
                  "https://s3.eu-west-2.amazonaws.com/zupa.dev.intelia.io/images/logos/NzXLGHiO-1605774082635-carrot-cake-3.jpg",
                storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
                createdAt: "2020-11-19T08:22:28.794Z",
                updatedAt: "2020-11-19T08:22:28.808Z",
                baseProductId: "51f2fbd2-9354-4cae-986b-8478aeba5320",
                categorySizeId: "2bcf0918-b474-4a59-89f2-295b5b04c711",
              },
            },
            {
              id: "b3e31c32-dae4-48ed-8485-c3d997c59ebf",
              productId: "c47ce244-25f3-4b63-8290-265a09c8ee29",
              quantity: 4,
              quantityAvailableForDispatch: 0,
              orderId: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
              createdAt: "2021-02-10T08:38:22.581Z",
              updatedAt: "2021-02-10T08:38:22.581Z",
              product: {
                id: "c47ce244-25f3-4b63-8290-265a09c8ee29",
                name: "Carrot Cake",
                unitPrice: 20000,
                isDeleted: false,
                imageUrl:
                  "https://s3.eu-west-2.amazonaws.com/zupa.dev.intelia.io/images/logos/1t9JBXUT-1605774088333-carrot-cake-3.jpg",
                storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
                createdAt: "2020-11-19T08:22:28.794Z",
                updatedAt: "2020-11-19T08:22:28.808Z",
                baseProductId: "51f2fbd2-9354-4cae-986b-8478aeba5320",
                categorySizeId: "aa6bffaa-2fe0-4a75-9552-745362aa1ae1",
              },
            },
          ],
        },
      },
      {
        id: "d9b0bcfe-d-4cf8-9645-e2fae1284640",
        dispatchId: "6406132b-4aca-49dc-b102-c088e0c2f642",
        orderId: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
        position: 1,
        status: "",
        createdAt: "2021-03-10T07:40:47.199Z",
        updatedAt: "2021-03-10T19:17:59.256Z",
        order: {
          id: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
          storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
          customerId: "19ba368c-8acd-4c11-965b-f9cc1cb4fbd2",
          isDeleted: false,
          status: "ready for dispatch",
          specialNote: null,
          deliveryLocation: {
            address: "Maroko, Lagos, Nigeria",
            latitude: 6.435820199999999,
            longitude: 3.4471546,
            customerId: "19ba368c-8acd-4c11-965b-f9cc1cb4fbd2",
          },
          recipient: {
            name: "Udoka ",
            phoneNumber: "00888888888",
          },
          itemsCompletionStatus: null,
          taxPercentage: 0,
          discountType: null,
          discountValue: 0,
          total: 183500,
          grandTotal: 183500,
          deliveryDate: null,
          deliveryMethod: null,
          createdAt: "2020-11-23T08:22:40.895Z",
          updatedAt: "2021-02-12T11:23:34.560Z",
          deliveryTypeId: "f71a287b-5870-4627-bd44-bd4eb476fea2",
          customer: {
            id: "19ba368c-8acd-4c11-965b-f9cc1cb4fbd2",
            name: "Udoka ",
            phoneNumber: "00888888888",
            address: "Oniru",
            addressDescription: null,
            pin: null,
            email: null,
            isDeleted: false,
            storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
            createdAt: "2020-11-23T08:22:31.803Z",
            updatedAt: "2021-02-10T08:38:22.101Z",
          },
          order_items: [
            {
              id: "4d8b3b20-3135-4918-8f97-e3a209bf6612",
              productId: "67d09f46-17a4-4c97-91d9-efe1be4abe49",
              quantity: 3,
              quantityAvailableForDispatch: 0,
              orderId: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
              createdAt: "2021-02-10T08:38:22.580Z",
              updatedAt: "2021-02-10T08:38:22.580Z",
              product: {
                id: "67d09f46-17a4-4c97-91d9-efe1be4abe49",
                name: "Carrot Cake",
                unitPrice: 12500,
                isDeleted: false,
                imageUrl:
                  "https://s3.eu-west-2.amazonaws.com/zupa.dev.intelia.io/images/logos/NzXLGHiO-1605774082635-carrot-cake-3.jpg",
                storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
                createdAt: "2020-11-19T08:22:28.794Z",
                updatedAt: "2020-11-19T08:22:28.808Z",
                baseProductId: "51f2fbd2-9354-4cae-986b-8478aeba5320",
                categorySizeId: "2bcf0918-b474-4a59-89f2-295b5b04c711",
              },
            },
            {
              id: "99d61d3a-e2d8-4208-af67-af41865ab6d8",
              productId: "67d09f46-17a4-4c97-91d9-efe1be4abe49",
              quantity: 4,
              quantityAvailableForDispatch: 0,
              orderId: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
              createdAt: "2021-02-10T08:38:22.581Z",
              updatedAt: "2021-02-10T08:38:22.581Z",
              product: {
                id: "67d09f46-17a4-4c97-91d9-efe1be4abe49",
                name: "Carrot Cake",
                unitPrice: 12500,
                isDeleted: false,
                imageUrl:
                  "https://s3.eu-west-2.amazonaws.com/zupa.dev.intelia.io/images/logos/NzXLGHiO-1605774082635-carrot-cake-3.jpg",
                storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
                createdAt: "2020-11-19T08:22:28.794Z",
                updatedAt: "2020-11-19T08:22:28.808Z",
                baseProductId: "51f2fbd2-9354-4cae-986b-8478aeba5320",
                categorySizeId: "2bcf0918-b474-4a59-89f2-295b5b04c711",
              },
            },
            {
              id: "b3e31c32-dae4-48ed-8485-c3d997c59ebf",
              productId: "c47ce244-25f3-4b63-8290-265a09c8ee29",
              quantity: 4,
              quantityAvailableForDispatch: 0,
              orderId: "3e3fa9ee-6e6f-42eb-ad29-9f836fb71124",
              createdAt: "2021-02-10T08:38:22.581Z",
              updatedAt: "2021-02-10T08:38:22.581Z",
              product: {
                id: "c47ce244-25f3-4b63-8290-265a09c8ee29",
                name: "Carrot Cake",
                unitPrice: 20000,
                isDeleted: false,
                imageUrl:
                  "https://s3.eu-west-2.amazonaws.com/zupa.dev.intelia.io/images/logos/1t9JBXUT-1605774088333-carrot-cake-3.jpg",
                storeId: "ba629b0f-9749-4097-bfc7-825fdcfe6811",
                createdAt: "2020-11-19T08:22:28.794Z",
                updatedAt: "2020-11-19T08:22:28.808Z",
                baseProductId: "51f2fbd2-9354-4cae-986b-8478aeba5320",
                categorySizeId: "aa6bffaa-2fe0-4a75-9552-745362aa1ae1",
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "df749814-5d03-4359-9884-d",
    position: 1,
    deliveryMethod: null,
    isDeleted: false,
    riderId: "9c25016f-056a-492e-b9e1-78909589554b",
    dispatchDistributionId: "e9325451-a9fc-45e7-80d5-559ffd8269af",
    createdAt: "2020-07-06T06:03:04.127Z",
    updatedAt: "2021-03-10T16:26:40.943Z",
    dispatch_orders: [
      {
        id: "6d4db76",
        dispatchId: "df749814-5d03-4359-9884-450eb833fa8d",
        orderId: "7f319afb-9427-496f-aa5a-a4cc901a7f20",
        position: 1,
        status: "pending",
        createdAt: "2020-07-06T06:03:04.130Z",
        updatedAt: "2021-03-10T20:31:30.867Z",
        order: {
          id: "7f319afb-9427-496f-aa5a-a4cc901a7f20",
          storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
          customerId: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
          isDeleted: false,
          status: "ready for dispatch",
          specialNote: "string",
          deliveryLocation: null,
          recipient: null,
          itemsCompletionStatus: null,
          taxPercentage: 0,
          discountType: null,
          discountValue: 0,
          total: 0,
          grandTotal: 0,
          deliveryDate: null,
          deliveryMethod: null,
          createdAt: "2020-06-28T21:20:29.456Z",
          updatedAt: "2020-07-06T09:21:46.281Z",
          deliveryTypeId: "7623b277-657a-45a4-b660-f4618f09b451",
          customer: {
            id: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
            name: "Hassan",
            phoneNumber: "07061629372",
            address: "Unknown",
            addressDescription: "hhhh",
            pin: "$2b$04$KdZ4vGXHBS2NF92BgRLKPuDHhLFi85/rRU8Tq66wWMsxlE.2BK9Tu",
            email: null,
            isDeleted: false,
            storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
            createdAt: "2020-06-28T20:42:46.700Z",
            updatedAt: "2020-11-20T21:29:27.009Z",
          },
          order_items: [
            {
              id: "f13727bb-1055-4d22-ba77-a46b26bf6d48",
              productId: "bfcd2108-6e36-4c0e-802a-664e62ef9a55",
              quantity: 5,
              quantityAvailableForDispatch: 0,
              orderId: "7f319afb-9427-496f-aa5a-a4cc901a7f20",
              createdAt: "2020-06-28T21:25:47.808Z",
              updatedAt: "2020-06-28T21:25:47.808Z",
              product: {
                id: "bfcd2108-6e36-4c0e-802a-664e62ef9a55",
                name: "Fish",
                unitPrice: 12,
                isDeleted: false,
                imageUrl: null,
                storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
                createdAt: "2020-06-28T21:17:55.607Z",
                updatedAt: "2020-06-28T21:17:55.608Z",
                baseProductId: null,
                categorySizeId: null,
              },
            },
          ],
        },
      }
    ],
  },
  {
    id: "8c9a58-9334cb475ac8",
    position: 2,
    deliveryMethod: null,
    isDeleted: false,
    riderId: "9c25016f-056a-492e-b9e1-78909589554b",
    dispatchDistributionId: "e9325451-a9fc-45e7-80d5-559ffd8269af",
    createdAt: "2020-07-06T06:03:04.127Z",
    updatedAt: "2021-03-10T16:26:40.943Z",
    dispatch_orders: [
      {
        id: "892-58d2-48c1-a1ef-8161430ca5e9",
        dispatchId: "8c6ab1a2-bfc3-42cf-9a58-9334cb475ac8",
        orderId: "bd76e2d0-e6b2-42b5-9bd2-4cba7262024f",
        position: 1,
        status: "pending",
        createdAt: "2020-07-06T06:03:04.134Z",
        updatedAt: "2021-03-10T20:59:08.653Z",
        order: {
          id: "bd76e2d0-e6b2-42b5-9bd2-4cba7262024f",
          storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
          customerId: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
          isDeleted: false,
          status: "ready for dispatch",
          specialNote: null,
          deliveryLocation: null,
          recipient: null,
          itemsCompletionStatus: null,
          taxPercentage: 0,
          discountType: null,
          discountValue: 0,
          total: 0,
          grandTotal: 0,
          deliveryDate: null,
          deliveryMethod: null,
          createdAt: "2020-07-06T06:00:46.509Z",
          updatedAt: "2020-07-06T09:21:46.281Z",
          deliveryTypeId: "29511d5c-47de-4424-a89e-3aebac1fa0fc",
          customer: {
            id: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
            name: "Hassan",
            phoneNumber: "07061629372",
            address: "Unknown",
            addressDescription: "hhhh",
            pin: "$2b$04$KdZ4vGXHBS2NF92BgRLKPuDHhLFi85/rRU8Tq66wWMsxlE.2BK9Tu",
            email: null,
            isDeleted: false,
            storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
            createdAt: "2020-06-28T20:42:46.700Z",
            updatedAt: "2020-11-20T21:29:27.009Z",
          },
          order_items: [
            {
              id: "5051feec-7eba-4bf2-911e-d247867f1da8",
              productId: "4dad9284-192f-40d4-8e0f-88af050519fc",
              quantity: 3,
              quantityAvailableForDispatch: 0,
              orderId: "bd76e2d0-e6b2-42b5-9bd2-4cba7262024f",
              createdAt: "2020-07-06T06:00:46.524Z",
              updatedAt: "2020-07-06T06:00:46.542Z",
              product: {
                id: "4dad9284-192f-40d4-8e0f-88af050519fc",
                name: "Rice",
                unitPrice: 100,
                isDeleted: false,
                imageUrl: null,
                storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
                createdAt: "2020-06-28T21:17:55.607Z",
                updatedAt: "2020-06-28T21:17:55.608Z",
                baseProductId: null,
                categorySizeId: null,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "0c896f48-a8f5-476d-bb53-0d9e4f199d6f",
    position: 1,
    deliveryMethod: null,
    isDeleted: false,
    riderId: "9c25016f-056a-492e-b9e1-78909589554b",
    dispatchDistributionId: "ea5c7bd7-3dbf-47dc-aeb5-98a641d7692e",
    createdAt: "2020-07-06T06:13:09.241Z",
    updatedAt: "2021-03-10T16:26:40.943Z",
    dispatch_orders: [
      {
        id: "407dac09-e354-4007-a165-e87906050ef2",
        dispatchId: "0c896f48-a8f5-476d-bb53-0d9e4f199d6f",
        orderId: "906e2c14-1bcd-4c53-bc53-c69181c12f7a",
        position: 1,
        status: "pending",
        createdAt: "2020-07-06T06:13:09.251Z",
        updatedAt: "2021-03-10T17:18:16.641Z",
        order: {
          id: "906e2c14-1bcd-4c53-bc53-c69181c12f7a",
          storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
          customerId: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
          isDeleted: false,
          status: "ready for dispatch",
          specialNote: null,
          deliveryLocation: null,
          recipient: null,
          itemsCompletionStatus: null,
          taxPercentage: 0,
          discountType: null,
          discountValue: 0,
          total: 0,
          grandTotal: 0,
          deliveryDate: null,
          deliveryMethod: null,
          createdAt: "2020-07-06T06:06:19.143Z",
          updatedAt: "2020-07-06T09:24:05.367Z",
          deliveryTypeId: "7623b277-657a-45a4-b660-f4618f09b451",
          customer: {
            id: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
            name: "Bello",
            phoneNumber: "07061629372",
            address: "Unknown",
            addressDescription: "hhhh",
            pin: "$2b$04$KdZ4vGXHBS2NF92BgRLKPuDHhLFi85/rRU8Tq66wWMsxlE.2BK9Tu",
            email: null,
            isDeleted: false,
            storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
            createdAt: "2020-06-28T20:42:46.700Z",
            updatedAt: "2020-11-20T21:29:27.009Z",
          },
          order_items: [
            {
              id: "9575f1d0-ec11-42fc-9049-ceeb46ddba52",
              productId: "4dad9284-192f-40d4-8e0f-88af050519fc",
              quantity: 1,
              quantityAvailableForDispatch: 0,
              orderId: "906e2c14-1bcd-4c53-bc53-c69181c12f7a",
              createdAt: "2020-07-06T06:06:19.159Z",
              updatedAt: "2020-07-06T06:06:19.165Z",
              product: {
                id: "4dad9284-192f-40d4-8e0f-88af050519fc",
                name: "Rice",
                unitPrice: 100,
                isDeleted: false,
                imageUrl: null,
                storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
                createdAt: "2020-06-28T21:17:55.607Z",
                updatedAt: "2020-06-28T21:17:55.608Z",
                baseProductId: null,
                categorySizeId: null,
              },
            },
            {
              id: "7a0fd163-52f9-4665-888c-863ce16aa922",
              productId: "bfcd2108-6e36-4c0e-802a-664e62ef9a55",
              quantity: 2,
              quantityAvailableForDispatch: 0,
              orderId: "906e2c14-1bcd-4c53-bc53-c69181c12f7a",
              createdAt: "2020-07-06T06:06:19.159Z",
              updatedAt: "2020-07-06T06:06:19.165Z",
              product: {
                id: "bfcd2108-6e36-4c0e-802a-664e62ef9a55",
                name: "Fish",
                unitPrice: 12,
                isDeleted: false,
                imageUrl: null,
                storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
                createdAt: "2020-06-28T21:17:55.607Z",
                updatedAt: "2020-06-28T21:17:55.608Z",
                baseProductId: null,
                categorySizeId: null,
              },
            },
          ],
        },
      },
      {
        id: "487906050ef2",
        dispatchId: "0c896f48-a8f5-476d-bb53-0d9e4f199d6f",
        orderId: "906e2c14-1bcd-4c53-bc53-c69181c12f7a",
        position: 1,
        status: "pending",
        createdAt: "2020-07-06T06:13:09.251Z",
        updatedAt: "2021-03-10T17:18:16.641Z",
        order: {
          id: "906e2c14-1bcd-4c53-bc53-c69181c12f7a",
          storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
          customerId: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
          isDeleted: false,
          status: "ready for dispatch",
          specialNote: null,
          deliveryLocation: null,
          recipient: null,
          itemsCompletionStatus: null,
          taxPercentage: 0,
          discountType: null,
          discountValue: 0,
          total: 0,
          grandTotal: 0,
          deliveryDate: null,
          deliveryMethod: null,
          createdAt: "2020-07-06T06:06:19.143Z",
          updatedAt: "2020-07-06T09:24:05.367Z",
          deliveryTypeId: "7623b277-657a-45a4-b660-f4618f09b451",
          customer: {
            id: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
            name: "Ahmed Tinubu",
            phoneNumber: "07061629372",
            address: "Unknown",
            addressDescription: "hhhh",
            pin: "$2b$04$KdZ4vGXHBS2NF92BgRLKPuDHhLFi85/rRU8Tq66wWMsxlE.2BK9Tu",
            email: null,
            isDeleted: false,
            storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
            createdAt: "2020-06-28T20:42:46.700Z",
            updatedAt: "2020-11-20T21:29:27.009Z",
          },
          order_items: [
            {
              id: "9575f1d0-ec11-42fc-9049-ceeb46ddba52",
              productId: "4dad9284-192f-40d4-8e0f-88af050519fc",
              quantity: 1,
              quantityAvailableForDispatch: 0,
              orderId: "906e2c14-1bcd-4c53-bc53-c69181c12f7a",
              createdAt: "2020-07-06T06:06:19.159Z",
              updatedAt: "2020-07-06T06:06:19.165Z",
              product: {
                id: "4dad9284-192f-40d4-8e0f-88af050519fc",
                name: "Rice",
                unitPrice: 100,
                isDeleted: false,
                imageUrl: null,
                storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
                createdAt: "2020-06-28T21:17:55.607Z",
                updatedAt: "2020-06-28T21:17:55.608Z",
                baseProductId: null,
                categorySizeId: null,
              },
            },
            {
              id: "7a0fd163-52f9-4665-888c-863ce16aa922",
              productId: "bfcd2108-6e36-4c0e-802a-664e62ef9a55",
              quantity: 2,
              quantityAvailableForDispatch: 0,
              orderId: "906e2c14-1bcd-4c53-bc53-c69181c12f7a",
              createdAt: "2020-07-06T06:06:19.159Z",
              updatedAt: "2020-07-06T06:06:19.165Z",
              product: {
                id: "bfcd2108-6e36-4c0e-802a-664e62ef9a55",
                name: "Fish",
                unitPrice: 12,
                isDeleted: false,
                imageUrl: null,
                storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
                createdAt: "2020-06-28T21:17:55.607Z",
                updatedAt: "2020-06-28T21:17:55.608Z",
                baseProductId: null,
                categorySizeId: null,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "d7b0d0c2-7d43-4445-982c-30dd418ce15e",
    position: 2,
    deliveryMethod: null,
    isDeleted: false,
    riderId: "9c25016f-056a-492e-b9e1-78909589554b",
    dispatchDistributionId: "ea5c7bd7-3dbf-47dc-aeb5-98a641d7692e",
    createdAt: "2020-07-06T06:13:09.242Z",
    updatedAt: "2021-03-10T16:26:40.943Z",
    dispatch_orders: [
      {
        id: "c06a4cc9-1c14-4577-a987-87b63148498a",
        dispatchId: "d7b0d0c2-7d43-4445-982c-30dd418ce15e",
        orderId: "3bf3a207-f0fc-4e3c-b929-64b08331b267",
        position: 1,
        status: "pending",
        createdAt: "2020-07-06T06:13:09.253Z",
        updatedAt: "2021-03-10T19:14:57.956Z",
        order: {
          id: "3bf3a207-f0fc-4e3c-b929-64b08331b267",
          storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
          customerId: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
          isDeleted: false,
          status: "pending",
          specialNote: null,
          deliveryLocation: null,
          recipient: null,
          itemsCompletionStatus: null,
          taxPercentage: 0,
          discountType: null,
          discountValue: 0,
          total: 0,
          grandTotal: 0,
          deliveryDate: null,
          deliveryMethod: null,
          createdAt: "2020-07-06T06:08:50.816Z",
          updatedAt: "2020-07-06T09:23:20.798Z",
          deliveryTypeId: "7623b277-657a-45a4-b660-f4618f09b451",
          customer: {
            id: "7e9e57d1-fcf5-426e-9394-ff6b0a127cc2",
            name: "Hassan",
            phoneNumber: "07061629372",
            address: "Unknown",
            addressDescription: "hhhh",
            pin: "$2b$04$KdZ4vGXHBS2NF92BgRLKPuDHhLFi85/rRU8Tq66wWMsxlE.2BK9Tu",
            email: null,
            isDeleted: false,
            storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
            createdAt: "2020-06-28T20:42:46.700Z",
            updatedAt: "2020-11-20T21:29:27.009Z",
          },
          order_items: [
            {
              id: "fd24e232-7b61-4fd9-85df-1b4c965db255",
              productId: "bfcd2108-6e36-4c0e-802a-664e62ef9a55",
              quantity: 4,
              quantityAvailableForDispatch: 0,
              orderId: "3bf3a207-f0fc-4e3c-b929-64b08331b267",
              createdAt: "2020-07-06T06:08:50.831Z",
              updatedAt: "2020-07-06T06:08:50.837Z",
              product: {
                id: "bfcd2108-6e36-4c0e-802a-664e62ef9a55",
                name: "Fish",
                unitPrice: 12,
                isDeleted: false,
                imageUrl: null,
                storeId: "1eeb1f02-b90f-49d3-a221-2783372558e4",
                createdAt: "2020-06-28T21:17:55.607Z",
                updatedAt: "2020-06-28T21:17:55.608Z",
                baseProductId: null,
                categorySizeId: null,
              },
            },
          ],
        },
      },
    ],
  },
];
