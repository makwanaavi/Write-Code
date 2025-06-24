import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <Link href={'/'}>
            <Image
                src={'/logo.png'}
                width={100}
                height={50}
                alt='Write Code'
                priority
                quality={100}
            />
       </Link>
    )
}

export default Logo