import { clsx } from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type ProductListItemFragment, type VariantDetailsFragment } from "@/gql/graphql";

export function VariantSelector({
	variants,
	product,
	selectedVariant,
}: {
	variants: readonly VariantDetailsFragment[];
	product: ProductListItemFragment;
	selectedVariant?: VariantDetailsFragment;
}) {
	if (!selectedVariant && variants.length === 1 && variants[0]?.quantityAvailable) {
		redirect(getHrefForVariant(product, variants[0]));
	}

	return (
		variants.length > 1 && (
			<fieldset className="my-4" role="radiogroup" data-testid="VariantSelector">
				<legend className="sr-only">Variants</legend>
				<div className="flex flex-wrap gap-3">
					{variants.map((variant) => {
						const isDisabled = !variant.quantityAvailable;
						const isCurrentVariant = selectedVariant?.id === variant.id;
						return (
							<Link
								key={variant.id}
								prefetch={true}
								scroll={false}
								href={isDisabled ? "#" : getHrefForVariant(product, variant)}
								className={clsx(
									isCurrentVariant
										? "border-transparent bg-neutral-900 text-white hover:bg-neutral-800"
										: "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100",
									"relative flex min-w-[8ch] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded border p-3 text-center text-sm font-semibold focus-within:outline focus-within:outline-2 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-100 aria-disabled:opacity-50",
									isDisabled && "pointer-events-none",
								)}
								role="radio"
								tabIndex={isDisabled ? -1 : undefined}
								aria-checked={isCurrentVariant}
								aria-disabled={isDisabled}
							>
								{variant.name}
							</Link>
						);
					})}
				</div>
			</fieldset>
		)
	);
}

function getHrefForVariant(product: ProductListItemFragment, variant: VariantDetailsFragment): string {
	const encodedProductName = encodeURIComponent(product.slug);
	const pathname = `/products/${encodedProductName}`;
	const query = new URLSearchParams({ variant: variant.id, productId: String(productNameToId.get(encodedProductName)), productName: encodedProductName });
	return `${pathname}?${query.toString()}`;
}

// Encoded name does not match name in DB
const productNameToId = new Map<string, number>([
	['la-roche-posay-toleriane-hydrating-gentle-face-cleanser', 1],
	['harry-potter-paperbackbox-set-books-1-7', 2],
	['kitchenaid-classic-series-45-quart-tilt-head-stand-mixer', 3],
	['lego-classic-medium-creative-brick-box-10696-building-toy-set', 4],
	['samsung-galaxy-s21-5g-128gb-8gb', 5],
	['poly-bark-napa-leather-couch', 6]
]);
