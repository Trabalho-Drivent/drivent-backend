-- AlterTable
ALTER TABLE "Activities" ALTER COLUMN "createdAt" SET DEFAULT '2023-05-24 10:56:58.530663'::timestamp without time zone,
ALTER COLUMN "updatedAt" SET DEFAULT '2023-05-24 10:56:58.530663'::timestamp without time zone;

-- AlterTable
ALTER TABLE "ActivitiesSchedule" ALTER COLUMN "startsAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "endsAt" SET DATA TYPE TIMESTAMP(6);
