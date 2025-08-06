import prismaclient from "@/services/prisma";

export default async function  Page()
{
    const companies=await prismaclient.company.findMany({
        where:
        {

        }, 
        include:{
            owner:true
        }
    })
    return(
        <>
          <div>
            {
                companies?.map((comp)=>{
                    return(
                        <div key={comp.id}>
                            <h1>{comp.name}</h1>
                            <p>{comp.description}</p>

                        </div>
                    )
                })
            }
          </div>
        </>
    )
}
