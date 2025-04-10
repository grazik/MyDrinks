import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Add Whisky Old Fashioned drink
    const whiskyOldFashioned = await prisma.drink.create({
        data: {
            name: 'Whisky Old Fashioned',
            recipe: 'Stir the simple syrup, water, and bitters in a glass. Add the ice cubes and bourbon. Garnish.',
            createdAt: new Date('2025-04-07T15:54:00Z'), // Current date
            ingredients: {
                create: [
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'whisky'},
                                create: {name: 'whisky', type: 'spirit'}
                            }
                        },
                        amount: 60,
                        unit: 'ml'
                    },
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'Angostura'},
                                create: {name: 'Angostura', type: 'bitter'}
                            }
                        },
                        amount: 5,
                        unit: 'dashes'
                    },
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'Simple Syrup'},
                                create: {name: 'Simple Syrup', type: 'syrup'}
                            }
                        },
                        amount: 10,
                        unit: 'ml'
                    },
                ],
            },
        },
    });

    console.log('Added drink:', whiskyOldFashioned);

    // Add Mohito drink
    const mohito = await prisma.drink.create({
        data: {
            name: 'Mohito',
            recipe: 'Muddle mint leaves, lime wedges, and sugar in a glass to release the flavors. Fill the glass with ice cubes. Pour in the white rum. Top up with soda water and stir well. Garnish with a mint sprig and enjoy! 🍹',
            createdAt: new Date('2025-04-07T15:54:00Z'), // Current date
            ingredients: {
                create: [
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'rum'},
                                create: {name: 'rum', type: 'spirit'}
                            }
                        },
                        amount: 60,
                        unit: 'ml'
                    },
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'limonka'},
                                create: {name: 'limonka', type: 'fruit'}
                            }
                        },
                        amount: 1,
                        unit: 'pieces'
                    },
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'sugar'},
                                create: {name: 'sugar', type: 'sweetener'}
                            }
                        },
                        amount: 2,
                        unit: 'tsp'
                    },
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'mint'},
                                create: {name: 'mint', type: 'herb'}
                            }
                        },
                        amount: 10,
                        unit: 'leaves'
                    },
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'sparkling water'},
                                create: {name: 'sparkling water', type: 'mixer'}
                            }
                        },
                        amount: 200,
                        unit: 'ml'
                    }
                ],
            },
        },
    });

    console.log('Added drink:', mohito);

    // Add Mint Julep drink
    const mintJulep = await prisma.drink.create({
        data: {
            name: 'Mint Julep',
            recipe: 'Muddle mint leaves and sugar (or simple syrup) in a glass or julep cup. Fill the glass with crushed ice. Pour in the bourbon and stir until well chilled. Top with more crushed ice and garnish with a mint sprig. Enjoy! 🥃🌿',
            createdAt: new Date('2025-04-07T15:54:00Z'), // Current date
            ingredients: {
                create: [
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'mint'},
                                create: {name: 'mint', type: 'herb'}
                            }
                        },
                        amount: 10,
                        unit: 'leaves'
                    },
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'sugar'},
                                create: {name: 'sugar', type: 'sweetener'}
                            }
                        },
                        amount: 1,
                        unit: 'tsp'
                    },
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'whisky'},
                                create: {name: 'whisky', type: 'spirit'}
                            }
                        },
                        amount: 45,
                        unit: 'ml'
                    }
                ]
            }
        }
    });

    console.log('Added drink:', mintJulep);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
