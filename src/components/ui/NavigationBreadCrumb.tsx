import React, { Fragment } from "react";
import Link from "next/link";
import { Package, ShoppingCart, Store, Truck, MoveLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "./breadcrumb";
interface NavigationBreadCrumbProps {
  url: string;
  label: string;
  id: string;
}

const steps = [
  {
    label: "Home",
    href: "/",
    icon: Store,
  },
  {
    label: "Delivery Tracking",
    href: "#/delivery-tracking",
    icon: Truck,
  },
  {
    label: "Cart",
    href: "#/cart",
    icon: ShoppingCart,
  },
  {
    label: "Package",
    href: "#/package",
    icon: Package,
    active: true,
  },
];

export default function NavigationBreadCrumb({
  url,
  label,
  id,
}: NavigationBreadCrumbProps) {
  return (
    <div className="w-full flex flex-row items-center justify-between  px-4 py-2 rounded-md text-white mb-4">
      <Link
        href={url}
        className="font-medium text-xl flex flex-row items-center text-black hover:text-gray-600 gap-3"
      >
        <MoveLeft className="mr-2" size={32} color="black" />
        {label || "Back"}
      </Link>
      <Breadcrumb className="flex-1 justify-center hidden sm:flex">
        <BreadcrumbList>
          {steps.map((step, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                {step.active ? (
                  <BreadcrumbPage>
                    <step.icon className="h-5 w-5" />
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={`/business/${id}`}>
                    <step.icon className="h-5 w-5" />
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index !== steps.length - 1 && (
                <li
                  role="presentation"
                  aria-hidden="true"
                  className="inline-block h-[2px] w-[40px] bg-muted"
                />
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
