import dbConnect, { collectionNameObj } from '@/lib/dbConnect'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import Link from 'next/link';

export default async function ServicesSection() {
    const servicesCollection = dbConnect(collectionNameObj.servicesCollection);
    const data = await servicesCollection.find({}).toArray();

    return (
        <div className='grid grid-cols-12 gap-6 p-6'>
            {data.map((item) => {
                const price = Number(item.price) || 0;

                return (
                    <div key={item._id} className='col-span-12 md:col-span-6 lg:col-span-4'>
                        <div className="border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition-all">
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={314}
                                height={208}
                                className="w-full object-cover rounded-lg"
                            />
                            <h3 className="text-lg font-semibold text-gray-900 mt-3">{item.title}</h3>
                            <div className="flex justify-between">
                                <p className="text-md text-red-500 font-bold mt-1">Price: ${price.toFixed(2)}</p>
                                <Link href={`/services/${item._id}`} className="text-red-500" >
                                    <ArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
