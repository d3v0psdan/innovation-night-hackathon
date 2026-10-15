import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    title = '',
    description = '',
    funnel = false,
    children,
}: {
    title?: string;
    description?: string;
    funnel?: boolean;
    children: React.ReactNode;
}) {
    return (
        <AuthLayoutTemplate
            title={title}
            description={description}
            funnel={funnel}
        >
            {children}
        </AuthLayoutTemplate>
    );
}
