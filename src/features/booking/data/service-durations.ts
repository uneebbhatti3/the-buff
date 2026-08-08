import { ServiceType } from "../../../../generated/prisma/enums";

export const serviceDurations: Record<ServiceType, number> = {
  [ServiceType.INTERIOR_DETAILING]: 120,
  [ServiceType.EXTERIOR_DETAILING]: 180,
  [ServiceType.COMPLETE_DETAILING]: 420,
  [ServiceType.PREMIUM_WASH]: 90,
  [ServiceType.COMPOUND_AND_PAINT_CORRECTION]: 120,

  [ServiceType.CARNAUBA_WAX]: 60,
  [ServiceType.CERAMIC_WAX]: 90,
  [ServiceType.GRAPHENE_WAX]: 90,
  [ServiceType.HYBRID_WAX]: 90,

  [ServiceType.CERAMIC_SPRAY_COATING]: 60,
  [ServiceType.GRAPHENE_SPRAY_COATING]: 60,
  [ServiceType.HYBRID_SPRAY_COATING]: 60,

  [ServiceType.RUST_REMOVAL_AND_CHROME_POLISH]: 60,
};
