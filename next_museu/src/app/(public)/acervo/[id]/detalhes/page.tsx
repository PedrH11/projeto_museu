'use client';

import { Navbar } from '@/components/shared/landing/nav-bar';
import { Footer } from '@/components/shared/landing/footer';
import { useParams } from 'next/navigation';
import { ArtworkDetails } from '@/components/shared/collection/artwork-details';

export default function ArtworkDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <ArtworkDetails obraId={id} />
            <Footer />
        </div>
    );
}
