/**
 * Card Component
 * Reusable card container with header, body, and footer sections
 */

const Card = ({
    title,
    subtitle,
    children,
    footer,
    className = '',
    headerAction,
    ...props
}) => {
    return (
        <div className={`card ${className}`} {...props}>
            {(title || subtitle || headerAction) && (
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                    <div>
                        {title && (
                            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        )}
                        {subtitle && (
                            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                        )}
                    </div>
                    {headerAction && (
                        <div>{headerAction}</div>
                    )}
                </div>
            )}

            <div className="card-body">
                {children}
            </div>

            {footer && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
